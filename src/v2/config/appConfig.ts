// export const API_BASE_URL = process.env.USE_LOCALHOST ? 'http://localhost:8080' : '/';

// TODO: Confirm using http://localhost:8000 works and then you can remove
export const API_BASE_URL = window.location.host === "localhost:9001" ? "http://projectrefocus.gscbinc.com" : "";