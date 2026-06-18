import { supabase } from "../lib/supabase";
import "./Login.css";

export default function Login() {

    const signInWithGoogle = async () => {
        const { error } =
            await supabase.auth.signInWithOAuth({
                provider: "google",
            });

        if (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-page">

            <div className="bg-orb orb-1"></div>
            <div className="bg-orb orb-2"></div>
            <div className="bg-orb orb-3"></div>

            <div className="login-card">

                <div className="login-badge">
                    Smart Pantry Management
                </div>

                <h1 className="login-title">
                    🧊 ShelfSense
                </h1>

                <p className="login-subtitle">
                    Track groceries.
                    <br />
                    Prevent waste.
                    <br />
                    Collaborate with family.
                </p>

                <button
                    className="google-btn"
                    onClick={signInWithGoogle}
                >
                    Continue with Google →
                </button>

            </div>

        </div>
    );
}