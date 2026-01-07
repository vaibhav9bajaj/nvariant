REVOKE ALL ON ALL TABLES IN SCHEMA public FROM advisory_ml_user;
GRANT SELECT ON drift_observations TO advisory_ml_user;
GRANT INSERT, UPDATE ON advisory_model_runs TO advisory_ml_user;
GRANT INSERT, UPDATE ON advisory_recommendations TO advisory_ml_user;

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM control_plane_user;
GRANT SELECT ON advisory_model_runs TO control_plane_user;
GRANT SELECT ON advisory_recommendations TO control_plane_user;
GRANT INSERT ON advisory_feedback TO control_plane_user;
GRANT UPDATE ON advisory_recommendations TO control_plane_user;

REVOKE ALL ON advisory_model_runs FROM enforcement_user;
REVOKE ALL ON advisory_recommendations FROM enforcement_user;
REVOKE ALL ON advisory_feedback FROM enforcement_user;
