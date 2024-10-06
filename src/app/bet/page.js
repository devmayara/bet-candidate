"use client";
import { claimPrize, getDispute, placeBet } from "@/services/Web3Service";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Web3 from "web3";

export default function Bet() {
  const { push } = useRouter();
  const [message, setMessage] = useState();
  const [dispute, setDispute] = useState({
    candidate1: "Loading...",
    candidate2: "Loading...",
    image1: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Anonymous_emblem.svg",
    image2: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Anonymous_emblem.svg",
    total1: 0,
    total2: 0,
    winner: 0,
  });
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [betAmount, setBetAmount] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("wallet")) return push("/");

    setMessage("Obtendo dados da disputa, aguarde...");
    getDispute()
      .then((dispute) => {
        setDispute(dispute);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
      });
  }, []);

  const openBetModal = (candidate) => {
    setSelectedCandidate(candidate);
    setShowModal(true);
  };

  const handleBet = () => {
    setMessage("Conectando na carteira, aguarde...");
    setShowModal(false);
    placeBet(selectedCandidate, betAmount)
      .then(() => {
        alert(
          "Aposta enviada com sucesso! Pode demorar 1 minuto para atualizar a disputa."
        );
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
      });
  };

  /*
  function processBet(candidate) {
    setMessage("Conectando na carteira, aguarde...");
    const amount = prompt("Quantia em POL para apostar:", "0.01");
    placeBet(candidate, amount)
      .then(() => {
        alert("Aposta enviada com sucesso! Pode demorar 1 minuto para atualizar a disputa.");
        setMessage("");
      })
      .catch(error => {
        console.log(error);
        setMessage(error.message);
      })
  }
  */

  function btnClaimClick() {
    setMessage("Conectando na carteira, aguarde...");
    claimPrize()
      .then(() => {
        alert(
          "Prêmio coletado com sucesso. Pode demorar 1 minuto para que apareça na sua carteira."
        );
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
      });
  }

  return (
    <>
      <div className="d-flex flex-column">
        <main className="container px-4 py-5 flex-grow-1">
          <div className="row align-items-center">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Bet Page
            </h1>
            <p className="lead">
              <b>Apostas on-chain nas eleições americanas.</b>
            </p>

            {dispute.winner == 0 ? (
              <p className="lead">
                Você tem ate o dia 04 de novembro para deixar sua aposta em um dos candidatos abaixo.
              </p>
            ) : (
              <p className="lead">
                Disputa encerrada. Veja o vencedor abaixo:
              </p>
            )}

          </div>

          <div className="row flex-lg-row-reverse align-items-center g-1 py-5">
            <div className="col"></div>
            {dispute.winner == 0 || dispute.winner == 1 ? (
              <div className="col">
                <h3 className="my-2 d-block mx-auto" style={{ width: 250 }}>
                  {dispute.candidate1}
                </h3>
                <img
                  className="d-block mx-auto img-fluid rounded"
                  width={250}
                  src={dispute.image1}
                  alt={dispute.candidate1}
                />
                {dispute.winner == 1 ? (
                  <button
                    className="btn btn-primary p-3 my-2 d-block mx-auto"
                    style={{ width: 250 }}
                    onClick={btnClaimClick}
                  >
                    <i className="bi bi-cash-coin"></i> Pegar prêmio
                  </button>
                ) : (
                  <button
                    className="btn btn-primary p-3 my-2 d-block mx-auto"
                    style={{ width: 250 }}
                    onClick={() => openBetModal(1)}
                  >
                    <i className="bi bi-cash-coin"></i> Aposte nesse candidato
                  </button>
                )}
                <span
                  className="badge text-bg-secondary d-block mx-auto"
                  style={{ width: 250 }}
                >
                  {Web3.utils.fromWei(dispute.total1, "ether")} POL Apostados
                </span>
              </div>
            ) : (
              <></>
            )}

            {dispute.winner == 0 || dispute.winner == 2 ? (
              <div className="col">
                <h3 className="my-2 d-block mx-auto" style={{ width: 250 }}>
                  {dispute.candidate2}
                </h3>
                <img
                  className="d-block mx-auto img-fluid rounded"
                  width={250}
                  src={dispute.image2}
                  alt={dispute.candidate2}
                />
                {dispute.winner == 2 ? (
                  <button
                    className="btn btn-primary p-3 my-2 d-block mx-auto"
                    style={{ width: 250 }}
                    onClick={btnClaimClick}
                  >
                    <i className="bi bi-cash-coin"></i> Pegar prêmio
                  </button>
                ) : (
                  <button
                    className="btn btn-primary p-3 my-2 d-block mx-auto"
                    style={{ width: 250 }}
                    onClick={() => openBetModal(2)}
                  >
                    <i className="bi bi-cash-coin"></i> Aposte nesse candidato
                  </button>
                )}
                <span
                  className="badge text-bg-secondary d-block mx-auto"
                  style={{ width: 250 }}
                >
                  {Web3.utils.fromWei(dispute.total2, "ether")} POL Apostados
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="row align-items-center">
            <p className="message">{ message }</p>
          </div>

          {/* Modal */}
          <div
            className={`modal fade ${showModal ? "show d-block" : ""}`}
            tabIndex="-1"
            style={{ display: showModal ? "block" : "none" }}
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Apostar em POL</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Insira a quantia de POL que deseja apostar:</p>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0.01"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary-border-subtle"
                    onClick={() => setShowModal(false)}
                  >
                    <i className="bi bi-x-lg"></i> Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleBet}
                  >
                    <i className="bi bi-send"></i> Confirmar Aposta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
