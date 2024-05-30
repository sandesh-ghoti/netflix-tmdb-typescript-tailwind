import React, { useState } from "react";
import { TMDB_API_KEY } from "../constants";
import {
  loginFailure,
  loginIntialise,
  loginSuccess,
  useAppDispatch,
  useGetRequestTokenQuery,
  useSetSessionTokenMutation,
} from "../store";
import { ErrorResponse, ValidateLoginResponse } from "../utils/commonTypes";
import { useLocation, useNavigate } from "react-router-dom";
const LoginComponent: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const {
    data: requestToken,
    isLoading: isRequestTokenLoading,
    refetch,
  } = useGetRequestTokenQuery();
  const [setSessionId, { data: sessionData }] = useSetSessionTokenMutation();
  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    const from = location.state?.from?.pathname || "/";
    try {
      dispatch(loginIntialise());
      if (!requestToken?.request_token) {
        throw new Error("Failed to fetch request token");
      }
      if (new Date().getTime() > new Date(requestToken.expires_at).getTime()) {
        console.log("request token expired");
        await refetch();
      }
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${TMDB_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
            request_token: requestToken?.request_token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data: ValidateLoginResponse = await response.json();
      if (!data.success) {
        const errorResponse = data as unknown as ErrorResponse;
        throw new Error(
          `Invalid username or password ${errorResponse.status_message}`
        );
      }
      const sessionResponse = await setSessionId({
        request_token: requestToken?.request_token,
      });
      console.log(
        "sessionResponse:",
        sessionResponse,
        "sessionData:",
        sessionData
      );
      if (!sessionResponse.data?.success) {
        throw new Error("Failed to set session token");
      }
      dispatch(loginSuccess(sessionResponse.data.session_id));
      setLoading(false);
      navigate(from, { replace: true });
    } catch (error) {
      dispatch(loginFailure((error as Error).message));
      setError((error as Error).message);
      console.error("Login failed:", (error as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className="w-64">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 rounded border bg-gray-100 dark:bg-gray-700 focus:outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 rounded border bg-gray-100 dark:bg-gray-700 focus:outline-none"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading || isRequestTokenLoading}
        >
          {isRequestTokenLoading
            ? "Request Token Loading..."
            : loading
            ? "Logging in..."
            : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
