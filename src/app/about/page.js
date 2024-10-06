export default function About() {
  return (
    <>
      <div className="d-flex flex-column">
        <main className="container px-4 py-5 flex-grow-1">
          <div className="row align-items-center">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Sobre
            </h1>
            <p className="lead">
              <b>BetCandidate</b> é uma plataforma de apostas on-chain nas
              eleições americanas. Participe das disputas e coloque sua aposta
              no candidato que você acredita que ira vencer.
            </p>
            <h2 className="mt-4">Regras da Disputa</h2>
            <p>
              A plataforma opera com base em contratos inteligentes escritos em
              Solidity, que garantem a execução automática e segura de todas as
              operações. Aqui está um resumo das principais regras:
            </p>

            <ul className="lead">
              <li>
                <strong>Aposta:</strong> Você pode apostar em um dos dois
                candidatos disponíveis até o dia (04 de novembro de 2024). Para
                fazer isso, basta selecionar o candidato desejado e realizar uma
                transação com uma quantia de criptomoeda POL.
              </li>
              <li>
                <strong>Escolha do Vencedor:</strong> Após o término das
                eleições e uma janela de tempo adicional (até 12 de novembro de
                2024), o vencedor será anunciado. O contrato determinará
                automaticamente o candidato vencedor com base nos resultados
                oficiais.
              </li>
              <li>
                <strong>Distribuição de Prêmios:</strong> O prêmio total será
                composto pela soma das apostas feitas em ambos os candidatos,
                subtraída de uma comissão de 10% (para cobrir as taxas
                operacionais da plataforma). O restante será distribuído entre
                os apostadores que acertaram o candidato vencedor,
                proporcionalmente ao valor apostado.
              </li>
              <li>
                <strong>Regras de Retirada:</strong> Se você apostou no
                candidato vencedor, poderá resgatar seu prêmio após o anúncio
                oficial do resultado. O valor do prêmio dependerá do quanto você
                apostou e da proporção em relação ao total apostado no candidato
                vencedor.
              </li>
              <li>
                <strong>Segurança das Apostas:</strong> As apostas não podem ser
                alteradas ou retiradas após serem feitas, e o contrato
                inteligente impede apostas duplicadas por um mesmo usuário.
              </li>
            </ul>

            <p className="message">
              Participe agora e aposte no seu candidato favorito para as
              eleições americanas de 2024! Todas as transações são públicas e
              imutáveis, garantindo que o processo seja justo e transparente
              para todos os participantes.
            </p>
          </div>

          <div className="row align-items-center">
            <p className="message">
              As apostas são feitas diretamente na blockchain, garantindo
              segurança e transparência. Após as eleições, o vencedor será
              determinado e os prêmios serão distribuídos entre os apostadores
              vencedores.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
