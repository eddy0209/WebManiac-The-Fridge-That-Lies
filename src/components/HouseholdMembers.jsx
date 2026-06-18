import "./HouseholdMembers.css";

export default function HouseholdMembers() {
    return (
        <div className="members-card">

            <h3>Household Overview</h3>

            <div className="household-stat">
                <span className="household-number">1</span>
                <span className="household-label">
                    Active User
                </span>
            </div>

            <div className="household-note">
                Currently running in personal mode.
            </div>

            <div className="household-upgrade">
                🚀 Multi-user households coming soon
            </div>

        </div>
    );
}