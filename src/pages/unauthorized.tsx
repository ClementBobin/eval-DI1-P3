import { Link, useLocation  } from "react-router-dom";

type RedirectLocationState = {
    redirectTo?: unknown;
};


export const Unauthorized: React.FC = () => {
    const location = useLocation();
    const state = location.state as RedirectLocationState | null | undefined;
    let redirectTo = "/";
    if (state && typeof state.redirectTo === "string") {
        redirectTo = state.redirectTo;
    }

    return (
        <div
            className="flex items-center justify-center bg-linear-to-br from-slate-50 to-red-50 font-sans p-8"
        >
            <div
                className="text-center bg-white p-12 md:p-10 rounded-xl shadow-2xl max-w-2xl w-full"
                role="main"
                aria-labelledby="unauthorized-title"
            >
                <p
                    className="text-7xl md:text-8xl font-bold m-0 text-slate-900 tracking-tight"
                    aria-hidden="true"
                >
                    403
                </p>
                <h1
                    id="unauthorized-title"
                    className="mt-2 text-2xl font-semibold text-slate-900"
                >
                    Access Denied
                </h1>
                <p className="mt-3 text-slate-600 text-lg max-w-md mx-auto">
                    You don't have permission to access this page. This area requires administrator privileges.
                </p>
                <Link
                    to={redirectTo}
                    className="inline-block mt-6 bg-red-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    aria-label="Go to homepage"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
}
