    import "./Terraza1Section.css"

    const CompleteFloorPlan = () => {
    return (
        <div className="floor-plan-container">
        <div className="header">TERRAZA NUMERO 1</div>

        <div className="main-content">
            <div className="id-number">530001</div>

            {/* Top Numbers Section */}
            <div className="top-section">
            <div className="blue-numbers-left">
                {["0182", "0183", "0184", "0185", "0186", "0187", "0188", "0189", "0190"].map((num) => (
                <div key={num} className="cell navy">
                    {num}
                </div>
                ))}
            </div>
            <div className="blue-numbers-right">
                {["0191", "0192", "0193", "0194", "0195", "0196", "0197", "0198", "0199"].map((num) => (
                <div key={num} className="cell navy">
                    {num}
                </div>
                ))}
            </div>
            </div>

            <div className="simyo-text">simyo Equipo trabajo en casa ubicacion temporal</div>

            <div className="main-grid">
            {/* Left Side */}
            <div className="left-side">
                <div className="tl2-section">
                <div className="section-title">TL 2</div>
                <div className="grid-row">
                    {[
                    "0200",
                    "0201",
                    "0202",
                    "0203",
                    "0204",
                    "0205",
                    "0206",
                    "0207",
                    "0208",
                    "0209",
                    "0210",
                    "0211",
                    "0212",
                    ].map((num) => (
                    <div key={num} className="cell blue">
                        {num}
                    </div>
                    ))}
                    <div className="cell red">019</div>
                </div>
                <div className="grid-row">
                    {[
                    "0226",
                    "0227",
                    "0228",
                    "0229",
                    "0230",
                    "0231",
                    "0232",
                    "0233",
                    "0234",
                    "0235",
                    "0236",
                    "0237",
                    "0238",
                    ].map((num) => (
                    <div key={num} className="cell blue">
                        {num}
                    </div>
                    ))}
                    <div className="cell red">020</div>
                </div>
                <div className="ck-labels">
                    <span>CK 1</span>
                    <span>CK 2</span>
                </div>
                </div>

                <div className="eurona-section">
                <div className="section-title">EURONA</div>
                <div className="grid-row">
                    {["0252", "0253", "0254", "0255", "0256", "0257", "0258", "0259", "0260", "0261", "0262"].map((num) => (
                    <div key={num} className="cell blue">
                        {num}
                    </div>
                    ))}
                    <div className="cell red">021</div>
                </div>
                <div className="grid-row">
                    {["0275", "0276", "0277", "0278", "0279", "0280", "0281", "0282", "0283", "0284", "0285"].map((num) => (
                    <div key={num} className="cell blue">
                        {num}
                    </div>
                    ))}
                    <div className="cell red">022</div>
                </div>
                </div>

                <div className="leroy-section">
                <div className="section-title">LEROY MERLI-MRG-TELEPIZZA</div>
                <div className="grid-row">
                    {[
                    "0298",
                    "0299",
                    "0300",
                    "0301",
                    "0302",
                    "0303",
                    "0304",
                    "0305",
                    "0306",
                    "0307",
                    "0308",
                    "0309",
                    "0310",
                    ].map((num) => (
                    <div key={num} className="cell blue">
                        {num}
                    </div>
                    ))}
                    <div className="cell red">023</div>
                </div>
                <div className="grid-row">
                    {[
                    "0324",
                    "0325",
                    "0326",
                    "0327",
                    "0328",
                    "0329",
                    "0330",
                    "0331",
                    "0332",
                    "0333",
                    "0334",
                    "0335",
                    "0336",
                    ].map((num) => (
                    <div key={num} className="cell blue">
                        {num}
                    </div>
                    ))}
                    <div className="cell red">024</div>
                </div>
                </div>

                <div className="yellow-orange-section">
                <div className="grid-row">
                    {["0350", "0351", "0352", "0353", "0354", "0355", "0356", "0357", "0358", "0359", "0360"].map((num) => (
                    <div key={num} className="cell yellow">
                        {num}
                    </div>
                    ))}
                    <div className="cell">025</div>
                    <span className="label">Gris</span>
                </div>
                <div className="grid-row">
                    {["0373", "0374", "0375", "0376", "0377", "0378", "0379", "0380", "0381", "0382", "0383"].map((num) => (
                    <div key={num} className="cell orange">
                        {num}
                    </div>
                    ))}
                    <div className="cell">026</div>
                    <span className="label">Alexa</span>
                </div>
                <div className="number-label">27</div>
                </div>

                <div className="citas-section">
                <div className="section-title">CITAS</div>
                <div className="grid-row">
                    {["0396", "0397", "0398", "0399", "0400", "0401", "0402", "0403", "0404", "0405", "0406", "0407"].map(
                    (num) => (
                        <div key={num} className="cell orange">
                        {num}
                        </div>
                    ),
                    )}
                </div>
                <div className="grid-row">
                    {["0422", "0423", "0424", "0425", "0426", "0427", "0428", "0429", "0430", "0431", "0432", "0433"].map(
                    (num) => (
                        <div key={num} className="cell orange">
                        {num}
                        </div>
                    ),
                    )}
                    <div className="cell purple">0434</div>
                    <div className="cell red">028</div>
                </div>
                <div className="sub-label">Juan M Catalina</div>
                </div>

                <div className="cuadro-medico-section">
                <div className="section-title">CUADRO MEDICO</div>
                <div className="grid-row">
                    {["0448", "0449", "0450", "0451", "0452", "0453", "0454", "0455", "0456", "0457", "0458"].map((num) => (
                    <div key={num} className="cell purple">
                        {num}
                    </div>
                    ))}
                    <div className="cell">029</div>
                    <span className="label">Rosa Nataly</span>
                </div>
                <div className="grid-row">
                    {["0471", "0472", "0473", "0474", "0475", "0476", "0477", "0478", "0479", "0480", "0481"].map((num) => (
                    <div key={num} className="cell purple">
                        {num}
                    </div>
                    ))}
                    <div className="cell">030</div>
                </div>
                <div className="sub-label">Manuela Villegas</div>
                </div>

                <div className="bottom-section">
                <div className="grid-row">
                    {[
                    "0494",
                    "0495",
                    "0496",
                    "0497",
                    "0498",
                    "0499",
                    "0500",
                    "0501",
                    "0502",
                    "0503",
                    "0504",
                    "0505",
                    "0506",
                    "0507",
                    ].map((num) => (
                    <div key={num} className="cell purple">
                        {num}
                    </div>
                    ))}
                </div>
                <div className="bottom-labels">
                    <span>15</span>
                    <span>42</span>
                </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="right-side">
                <div className="section-title">TYT CLIENTE</div>
                <div className="client-section">
                <div className="name-label">DAVID AGUD</div>
                <div className="grid-row">
                    <div className="cell red">031</div>
                    <div className="cell magenta">0213</div>
                    <div className="cell">0214</div>
                    <div className="cell">0215</div>
                    <div className="cell">0216</div>
                    <div className="cell">0217</div>
                    <div className="cell">0218</div>
                    <div className="cell">0219</div>
                    <div className="cell">0220</div>
                    <div className="cell">0221</div>
                    <div className="cell">0222</div>
                    <div className="cell">0223</div>
                    <div className="cell">0224</div>
                    <div className="cell red">0225</div>
                </div>
                <div className="grid-row">
                    <div className="cell red">032</div>
                    <div className="cell magenta">0239</div>
                    <div className="cell magenta">0240</div>
                    <div className="cell magenta">0241</div>
                    <div className="cell magenta">0242</div>
                    <div className="cell magenta">0243</div>
                    <div className="cell">0244</div>
                    <div className="cell">0245</div>
                    <div className="cell">0246</div>
                    <div className="cell">0247</div>
                    <div className="cell">0248</div>
                    <div className="cell">0249</div>
                    <div className="cell">0250</div>
                    <div className="cell red">0251</div>
                </div>
                <div className="id-labels">
                    <span>530014</span>
                    <span className="blue-text">BAJAS</span>
                    <span className="red-text">TL JORGE GA</span>
                </div>
                </div>

                <div className="aseguramiento-section">
                <div className="section-title">ASEGURAMIENTO</div>
                <div className="grid-row">
                    <div className="cell red">033</div>
                    <div className="cell">0263</div>
                    <div className="cell">0264</div>
                    <div className="cell">0265</div>
                    <div className="cell">0266</div>
                    <div className="cell">0267</div>
                    <div className="cell">0268</div>
                    <div className="cell">0269</div>
                    <div className="cell">0270</div>
                    <div className="cell">0271</div>
                    <div className="cell">0272</div>
                    <div className="cell">0273</div>
                    <div className="cell">0274</div>
                </div>
                <div className="grid-row">
                    <div className="cell red">034</div>
                    <div className="cell">0286</div>
                    <div className="cell">0287</div>
                    <div className="cell">0288</div>
                    <div className="cell">0289</div>
                    <div className="cell">0290</div>
                    <div className="cell">0291</div>
                    <div className="cell">0292</div>
                    <div className="cell">0293</div>
                    <div className="cell">0294</div>
                    <div className="cell">0295</div>
                    <div className="cell">0296</div>
                    <div className="cell red">0297</div>
                </div>
                <div className="service-labels">
                    <span>530001</span>
                    <span className="pink-text">SERV CANAL</span>
                    <span className="red-text">TI Daniel</span>
                </div>
                </div>

                <div className="aux-admin-section">
                <div className="section-title">AUX ADMIN MP VALIDACION</div>
                <div className="grid-row">
                    <div className="cell red">035</div>
                    <div className="cell red">0311</div>
                    <div className="cell">0312</div>
                    <div className="cell">0313</div>
                    <div className="cell">0314</div>
                    <div className="cell">0315</div>
                    <div className="cell red">0316</div>
                    <div className="cell">0317</div>
                    <div className="cell">0318</div>
                    <div className="cell">0319</div>
                    <div className="cell">0320</div>
                    <div className="cell">0321</div>
                    <div className="cell">0322</div>
                    <div className="cell">0323</div>
                </div>
                <div className="grid-row">
                    <div className="cell red">036</div>
                    <div className="cell red">0337</div>
                    <div className="cell">0338</div>
                    <div className="cell">0339</div>
                    <div className="cell">0340</div>
                    <div className="cell">0341</div>
                    <div className="cell">0342</div>
                    <div className="cell">0343</div>
                    <div className="cell">0344</div>
                    <div className="cell">0345</div>
                    <div className="cell">0346</div>
                    <div className="cell">0347</div>
                    <div className="cell">0348</div>
                    <div className="cell red">0349</div>
                </div>
                <div className="service-labels">
                    <span className="red-text">TL JORGE</span>
                    <span className="red-text">TL YINNA</span>
                </div>
                </div>

                <div className="simyo-televentas-section">
                <div className="section-title">SIMYO TELEVENTAS</div>
                <div className="grid-row">
                    <div className="cell red">037</div>
                    <div className="cell">0361</div>
                    <div className="cell">0362</div>
                    <div className="cell">0363</div>
                    <div className="cell">0364</div>
                    <div className="cell green">0365</div>
                    <div className="cell green">0366</div>
                    <div className="cell green">0367</div>
                    <div className="cell green">0368</div>
                    <div className="cell green">0369</div>
                    <div className="cell green">0370</div>
                    <div className="cell green">0371</div>
                    <div className="cell green">0372</div>
                </div>
                <div className="grid-row">
                    <div className="cell red">038</div>
                    <div className="cell">0384</div>
                    <div className="cell">0385</div>
                    <div className="cell">0386</div>
                    <div className="cell">0387</div>
                    <div className="cell">388</div>
                    <div className="cell">0389</div>
                    <div className="cell">0390</div>
                    <div className="cell">0391</div>
                    <div className="cell">0392</div>
                    <div className="cell">0393</div>
                    <div className="cell">0394</div>
                    <div className="cell">0395</div>
                    <div className="cell">0396</div>
                </div>
                <div className="service-labels">
                    <span>TL YOLIMA</span>
                    <span className="red-text">CAMILA TL</span>
                </div>
                </div>

                <div className="laura-section">
                <div className="section-title">LAURA</div>
                <div className="grid-row">
                    <div className="cell red">039</div>
                    <div className="cell red">0409</div>
                    <div className="cell">0410</div>
                    <div className="cell">0411</div>
                    <div className="cell">0412</div>
                    <div className="cell">0413</div>
                    <div className="cell">0414</div>
                    <div className="cell">0415</div>
                    <div className="cell">0416</div>
                    <div className="cell">0417</div>
                    <div className="cell">0418</div>
                    <div className="cell">0419</div>
                    <div className="cell red">0420</div>
                    <div className="cell red">0421</div>
                </div>
                <div className="grid-row">
                    <div className="cell red">040</div>
                    <div className="cell red">0435</div>
                    <div className="cell">0436</div>
                    <div className="cell">0437</div>
                    <div className="cell">0438</div>
                    <div className="cell">0439</div>
                    <div className="cell">0440</div>
                    <div className="cell">0441</div>
                    <div className="cell">0442</div>
                    <div className="cell">0443</div>
                    <div className="cell">0444</div>
                    <div className="cell">0445</div>
                    <div className="cell">0446</div>
                    <div className="cell">0447</div>
                </div>
                <div className="service-labels">
                    <span className="red-text">TL JUAN RICARDO</span>
                </div>
                </div>

                <div className="cx-telepizza-section">
                <div className="section-title">CX tele*H telepizza</div>
                <div className="grid-row">
                    <div className="cell red">041</div>
                    <div className="cell red">0459</div>
                    <div className="cell red">0460</div>
                    <div className="cell">0461</div>
                    <div className="cell">0462</div>
                    <div className="cell">0463</div>
                    <div className="cell">0464</div>
                    <div className="cell">0465</div>
                    <div className="cell">0466</div>
                    <div className="cell">0467</div>
                    <div className="cell">0468</div>
                    <div className="cell">0469</div>
                    <div className="cell red">0470</div>
                </div>
                <div className="grid-row">
                    <div className="cell red">042</div>
                    <div className="cell">0482</div>
                    <div className="cell">0483</div>
                    <div className="cell">0484</div>
                    <div className="cell">0485</div>
                    <div className="cell">0486</div>
                    <div className="cell">0487</div>
                    <div className="cell">0488</div>
                    <div className="cell">0489</div>
                    <div className="cell">0490</div>
                    <div className="cell">0491</div>
                    <div className="cell">0492</div>
                    <div className="cell red">0493</div>
                </div>
                <div className="service-labels">
                    <span>Isasma</span>
                    <span className="red-text">CX SIMYO</span>
                </div>
                </div>

                <div className="bottom-right-section">
                <div className="grid-row">
                    {[
                    "0508",
                    "0509",
                    "0510",
                    "0511",
                    "0512",
                    "0513",
                    "0514",
                    "0515",
                    "0516",
                    "0517",
                    "0518",
                    "0519",
                    "0520",
                    "0521",
                    ].map((num) => (
                    <div key={num} className="cell blue">
                        {num}
                    </div>
                    ))}
                </div>
                <div className="bottom-labels">
                    <span>458</span>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
    }

    export default CompleteFloorPlan

