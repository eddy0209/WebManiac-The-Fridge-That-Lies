import "./ActivityFeed.css";

export default function ActivityFeed({
    activities
}) {
    return (
        <div className="activity-feed">

            <h3>
                Recent Activity
            </h3>

            {activities.length === 0 ? (
                <p>No activity yet</p>
            ) : (
                activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="activity-item"
                    >
                        <span>
                            {activity.message}
                        </span>

                        <small>
                            {activity.timestamp}
                        </small>
                    </div>
                ))
            )}

        </div>
    );
}