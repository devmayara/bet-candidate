import "./globals.css";

export const metadata = {
  title: "BetCandidate",
  description: "Apostas on-chain nas eleições americanas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-100">
      <body>
        <div
          className="bg-image d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: "url('/bandeira-americana.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
          }}
        >
          <div
            className="card p-4 m-3 shadow-lg rounded"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              maxWidth: "90%", //?Para evitar a largura fixa em dispositivos móveis
              width: "100%",
            }}
          >
            {children}
            <div className="container text-center">
              <p className="text-muted my-3">
                Smart Contract:
                <b> 0x6206c85A08F50e611455d3d8EFc93487DC0212F9</b>
              </p>
              <p className="text-muted mb-5">
                <a
                  href="https://amoy.polygonscan.com/address/0x6206c85A08F50e611455d3d8EFc93487DC0212F9"
                  target="_blank"
                  className="btn btn-outline-dark"
                  style={{
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="https://amoy.polygonscan.com/assets/generic/html/favicon-light.ico"
                    alt="PolygonScan"
                    width="20"
                    className="me-2"
                  />
                  Ver no PolygonScan
                </a>
              </p>
            </div>
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 m-4 border-top">
              <p className="col-4 mb-0 text-body-secondary">
                © {new Date().getFullYear()} BetCandidate
              </p>
              <ul className="nav col-4 justify-content-end">
                <li className="nav-item">
                  <a href="/" className="nav-link px-2 text-body-secondary">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/about" className="nav-link px-2 text-body-secondary">
                    About
                  </a>
                </li>
              </ul>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
