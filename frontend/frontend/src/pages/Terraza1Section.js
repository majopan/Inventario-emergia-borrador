    import "../styles/Terraza1Section.css"

    const CompleteFloorPlan = () => {
    return (
        <div className="floor-plan-container-terraza1">
            <div className="header-terraza1">TERRAZA NUMERO 1</div> {/* Encabezado arriba */}

            <div className="main-content-terraza1">
                <div className="id-number-terraza1">530001</div>

            {/* Top Numbers Section */}
            <div className="top-section-terraza1">
            <div className="blue-numbers-left-terraza1">
                {["0182", "0183", "0184", "0185", "0186", "0187", "0188", "0189", "0190"].map((num) => (
                <div key={num} className="cell-terraza1 navy-terraza1">
                    {num}
                </div>
                ))}
            </div>
            <div className="blue-numbers-right-terraza1">
                {["0191", "0192", "0193", "0194", "0195", "0196", "0197", "0198", "0199"].map((num) => (
                <div key={num} className="cell-terraza1 navy-terraza1">
                    {num}
                </div>
                ))}
            </div>
            </div>

            <div className="simyo-text-terraza1">simyo Equipo trabajo en casa ubicacion temporal</div>

            <div className="main-grid-terraza1">
            {/* Left Side */}
            <div className="left-side-terraza1">
                <div className="tl2-section-terraza1">
                <div className="section-title-terraza1">TL 2</div>
                <div className="grid-row-terraza1">
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
                    <div key={num} className="cell-terraza1 blue-terraza1">
                        {num}
                    </div>
                    ))}
                    <div className="cell-terraza1 red-terraza1">019</div>
                </div>
                <div className="grid-row-terraza1">
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
                    <div key={num} className="cell-terraza1 blue-terraza1">
                        {num}
                    </div>
                    ))}
                    <div className="cell-terraza1 red-terraza1">020</div>
                </div>
                <div className="ck-labels-terraza1">
                    <span>CK 1</span>
                    <span>CK 2</span>
                </div>
                </div>

                <div className="eurona-section-terraza1">
                <div className="section-title-terraza1">EURONA</div>
                <div className="grid-row-terraza1">
                    {["0252", "0253", "0254", "0255", "0256", "0257", "0258", "0259", "0260", "0261", "0262"].map((num) => (
                    <div key={num} className="cell-terraza1 blue-terraza1">
                        {num}
                    </div>
                    ))}
                    <div className="cell-terraza1 red-terraza1">021</div>
                </div>
                <div className="grid-row-terraza1">
                    {["0275", "0276", "0277", "0278", "0279", "0280", "0281", "0282", "0283", "0284", "0285"].map((num) => (
                    <div key={num} className="cell-terraza1 blue-terraza1">
                        {num}
                    </div>
                    ))}
                    <div className="cell-terraza1 red-terraza1">022</div>
                </div>
                </div>

                <div className="leroy-section-terraza1">
                <div className="section-title-terraza1">LEROY MERLI-MRG-TELEPIZZA</div>
                <div className="grid-row-terraza1">
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
                    <div key={num} className="cell-terraza1 blue-terraza1">
                        {num}
                    </div>
                    ))}
                    <div className="cell-terraza1 red-terraza1">023</div>
                </div>
                <div className="grid-row-terraza1">
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
                    <div key={num} className="cell-terraza1 blue-terraza1">
                        {num}
                    </div>
                    ))}
                    <div className="cell-terraza1 red-terraza1">024</div>
                </div>
                </div>

                <div className="yellow-orange-section-terraza1">
                <div className="grid-row-terraza1">
                    {["0350", "0351", "0352", "0353", "0354", "0355", "0356", "0357", "0358", "0359", "0360"].map((num) => (
                    <div key={num} className="cell-terraza1 yellow-terraza1">
                        {num}
                    </div>
                    ))}
                    <div className="cell-terraza1">025</div>
                    <span className="label-terraza1">Gris</span>
                </div>
                <div className="grid-row-terraza1">
                    {["0373", "0374", "0375", "0376", "0377", "0378", "0379", "0380", "0381", "0382", "0383"].map((num) => (
                    <div key={num} className="cell-terraza1 orange-terraza1">
                        {num}
                    </div>
                    ))}
                    <div className="cell-terraza1">026</div>
                    <span className="label-terraza1">Alexa</span>
                </div>
                <div className="number-label-terraza1">27</div>
                </div>

                <div className="citas-section-terraza1">
                <div className="section-title-terraza1">CITAS</div>
                <div className="grid-row-terraza1">
                    {["0396", "0397", "0398", "0399", "0400", "0401", "0402", "0403", "0404", "0405", "0406", "0407"].map(
                    (num) => (
                        <div key={num} className="cell-terraza1 orange-terraza1">
                        {num}
                        </div>
                    ),
                    )}
                </div>
                <div className="grid-row-terraza1">
                    {["0422", "0423", "0424", "0425", "0426", "0427", "0428", "0429", "0430", "0431", "0432", "0433"].map(
                    (num) => (
                        <div key={num} className="cell-terraza1 orange-terraza1">
                        {num}
                        </div>
                    ),
                    )}
                    <div className="cell-terraza1 purple-terraza1">0434</div>
                    <div className="cell-terraza1 red-terraza1">028</div>
                </div>
                <div className="sub-label-terraza1">Juan M Catalina</div>
                </div>

                <div className="cuadro-medico-section-terraza1">
                <div className="section-title-terraza1">CUADRO MEDICO</div>
                <div className="grid-row-terraza1">
                    {["0448", "0449", "0450", "0451", "0452", "0453", "0454", "0455", "0456", "0457", "0458"].map((num) => (
                    <div key={num} className="cell-terraza1 purple-terraza1">
                        {num}
                    </div>
                    ))}
                    <div className="cell-terraza1">029</div>
                    <span className="label-terraza1">Rosa Nataly</span>
                </div>
                <div className="grid-row-terraza1">
                    {["0471", "0472", "0473", "0474", "0475", "0476", "0477", "0478", "0479", "0480", "0481"].map((num) => (
                    <div key={num} className="cell-terraza1 purple-terraza1">
                        {num}
                    </div>
                    ))}
                    <div className="cell-terraza1">030</div>
                </div>
                <div className="sub-label-terraza1">Manuela Villegas</div>
                </div>

                <div className="bottom-section-terraza1">
                <div className="grid-row-terraza1">
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
                    <div key={num} className="cell-terraza1 purple-terraza1">
                        {num}
                    </div>
                    ))}
                </div>
                <div className="bottom-labels-terraza1">
                    <span>15</span>
                    <span>42</span>
                </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="right-side-terraza1">
                <div className="section-title-terraza1">TYT CLIENTE</div>
                <div className="client-section-terraza1">
                <div className="name-label-terraza1">DAVID AGUD</div>
                <div className="grid-row-terraza1">
                    <div className="cell-terraza1 red-terraza1">031</div>
                    <div className="cell-terraza1 magenta-terraza1">0213</div>
                    <div className="cell-terraza1">0214</div>
                    <div className="cell-terraza1">0215</div>
                    <div className="cell-terraza1">0216</div>
                    <div className="cell-terraza1">0217</div>
                    <div className="cell-terraza1">0218</div>
                    <div className="cell-terraza1">0219</div>
                    <div className="cell-terraza1">0220</div>
                    <div className="cell-terraza1">0221</div>
                    <div className="cell-terraza1">0222</div>
                    <div className="cell-terraza1">0223</div>
                    <div className="cell-terraza1">0224</div>
                    <div className="cell-terraza1 red-terraza1">0225</div>
                </div>
                <div className="grid-row-terraza1">
                    <div className="cell-terraza1 red-terraza1">032</div>
                    <div className="cell-terraza1 magenta-terraza1">0239</div>
                    <div className="cell-terraza1 magenta-terraza1">0240</div>
                    <div className="cell-terraza1 magenta-terraza1">0241</div>
                    <div className="cell-terraza1 magenta-terraza1">0242</div>
                    <div className="cell-terraza1 magenta-terraza1">0243</div>
                    <div className="cell-terraza1">0244</div>
                    <div className="cell-terraza1">0245</div>
                    <div className="cell-terraza1">0246</div>
                    <div className="cell-terraza1">0247</div>
                    <div className="cell-terraza1">0248</div>
                    <div className="cell-terraza1">0249</div>
                    <div className="cell-terraza1">0250</div>
                    <div className="cell-terraza1 red-terraza1">0251</div>
                </div>
                <div className="id-labels-terraza1">
                    <span>530014</span>
                    <span className="blue-text-terraza1">BAJAS</span>
                    <span className="red-text-terraza1">TL JORGE GA</span>
                </div>
                </div>

                <div className="aseguramiento-section-terraza1">
                <div className="section-title-terraza1">ASEGURAMIENTO</div>
                <div className="grid-row-terraza1">
                    <div className="cell-terraza1 red-terraza1">033</div>
                    <div className="cell-terraza1">0263</div>
                    <div className="cell-terraza1">0264</div>
                    <div className="cell-terraza1">0265</div>
                    <div className="cell-terraza1">0266</div>
                    <div className="cell-terraza1">0267</div>
                    <div className="cell-terraza1">0268</div>
                    <div className="cell-terraza1">0269</div>
                    <div className="cell-terraza1">0270</div>
                    <div className="cell-terraza1">0271</div>
                    <div className="cell-terraza1">0272</div>
                    <div className="cell-terraza1">0273</div>
                    <div className="cell-terraza1">0274</div>
                </div>
                <div className="grid-row-terraza1">
                    <div className="cell-terraza1 red-terraza1">034</div>
                    <div className="cell-terraza1">0286</div>
                    <div className="cell-terraza1">0287</div>
                    <div className="cell-terraza1">0288</div>
                    <div className="cell-terraza1">0289</div>
                    <div className="cell-terraza1">0290</div>
                    <div className="cell-terraza1">0291</div>
                    <div className="cell-terraza1">0292</div>
                    <div className="cell-terraza1">0293</div>
                    <div className="cell-terraza1">0294</div>
                    <div className="cell-terraza1">0295</div>
                    <div className="cell-terraza1">0296</div>
                    <div className="cell-terraza1 red-terraza1">0297</div>
                </div>
                <div className="service-labels-terraza1">
                    <span>530001</span>
                    <span className="pink-text-terraza1">SERV CANAL</span>
                    <span className="red-text-terraza1">TI Daniel</span>
                </div>
                </div>

                <div className="aux-admin-section-terraza1">
                <div className="section-title-terraza1">AUX ADMIN MP VALIDACION</div>
                <div className="grid-row-terraza1">
                    <div className="cell-terraza1 red-terraza1">035</div>
                    <div className="cell-terraza1 red-terraza1">0311</div>
                    <div className="cell-terraza1">0312</div>
                    <div className="cell-terraza1">0313</div>
                    <div className="cell-terraza1">0314</div>
                    <div className="cell-terraza1">0315</div>
                    <div className="cell-terraza1 red-terraza1">0316</div>
                    <div className="cell-terraza1">0317</div>
                    <div className="cell-terraza1">0318</div>
                    <div className="cell-terraza1">0319</div>
                    <div className="cell-terraza1">0320</div>
                    <div className="cell-terraza1">0321</div>
                    <div className="cell-terraza1">0322</div>
                    <div className="cell-terraza1">0323</div>
                </div>
                <div className="grid-row-terraza1">
                    <div className="cell-terraza1 red-terraza1">036</div>
                    <div className="cell-terraza1 red-terraza1">0337</div>
                    <div className="cell-terraza1">0338</div>
                    <div className="cell-terraza1">0339</div>
                    <div className="cell-terraza1">0340</div>
                    <div className="cell-terraza1">0341</div>
                    <div className="cell-terraza1">0342</div>
                    <div className="cell-terraza1">0343</div>
                    <div className="cell-terraza1">0344</div>
                    <div className="cell-terraza1">0345</div>
                    <div className="cell-terraza1">0346</div>
                    <div className="cell-terraza1">0347</div>
                    <div className="cell-terraza1">0348</div>
                    <div className="cell-terraza1 red-terraza1">0349</div>
                </div>
                <div className="service-labels-terraza1">
                    <span className="red-text-terraza1">TL JORGE</span>
                    <span className="red-text-terraza1">TL YINNA</span>
                </div>
                </div>

                <div className="simyo-televentas-section-terraza1">
                <div className="section-title-terraza1">SIMYO TELEVENTAS</div>
                <div className="grid-row-terraza1">
                    <div className="cell-terraza1 red-terraza1">037</div>
                    <div className="cell-terraza1">0361</div>
                    <div className="cell-terraza1">0362</div>
                    <div className="cell-terraza1">0363</div>
                    <div className="cell-terraza1">0364</div>
                    <div className="cell-terraza1 green-terraza1">0365</div>
                    <div className="cell-terraza1 green-terraza1">0366</div>
                    <div className="cell-terraza1 green-terraza1">0367</div>
                    <div className="cell-terraza1 green-terraza1">0368</div>
                    <div className="cell-terraza1 green-terraza1">0369</div>
                    <div className="cell-terraza1 green-terraza1">0370</div>
                    <div className="cell-terraza1 green-terraza1">0371</div>
                    <div className="cell-terraza1 green-terraza1">0372</div>
                </div>
                <div className="grid-row-terraza1">
                    <div className="cell-terraza1 red-terraza1">038</div>
                    <div className="cell-terraza1">0384</div>
                    <div className="cell-terraza1">0385</div>
                    <div className="cell-terraza1">0386</div>
                    <div className="cell-terraza1">0387</div>
                    <div className="cell-terraza1">388</div>
                    <div className="cell-terraza1">0389</div>
                    <div className="cell-terraza1">0390</div>
                    <div className="cell-terraza1">0391</div>
                    <div className="cell-terraza1">0392</div>
                    <div className="cell-terraza1">0393</div>
                    <div className="cell-terraza1">0394</div>
                    <div className="cell-terraza1">0395</div>
                    <div className="cell-terraza1">0396</div>
                </div>
                <div className="service-labels-terraza1">
                    <span>TL YOLIMA</span>
                    <span className="red-text-terraza1">CAMILA TL</span>
                </div>
                </div>

                <div className="laura-section-terraza1">
                <div className="section-title-terraza1">LAURA</div>
                <div className="grid-row-terraza1">
                    <div className="cell-terraza1 red-terraza1">039</div>
                    <div className="cell-terraza1 red-terraza1">0409</div>
                    <div className="cell-terraza1">0410</div>
                    <div className="cell-terraza1">0411</div>
                    <div className="cell-terraza1">0412</div>
                    <div className="cell-terraza1">0413</div>
                    <div className="cell-terraza1">0414</div>
                    <div className="cell-terraza1">0415</div>
                    <div className="cell-terraza1">0416</div>
                    <div className="cell-terraza1">0417</div>
                    <div className="cell-terraza1">0418</div>
                    <div className="cell-terraza1">0419</div>
                    <div className="cell-terraza1 red-terraza1">0420</div>
                    <div className="cell-terraza1 red-terraza1">0421</div>
                </div>
                <div className="grid-row-terraza1">
                    <div className="cell-terraza1 red-terraza1">040</div>
                    <div className="cell-terraza1 red-terraza1">0435</div>
                    <div className="cell-terraza1">0436</div>
                    <div className="cell-terraza1">0437</div>
                    <div className="cell-terraza1">0438</div>
                    <div className="cell-terraza1">0439</div>
                    <div className="cell-terraza1">0440</div>
                    <div className="cell-terraza1">0441</div>
                    <div className="cell-terraza1">0442</div>
                    <div className="cell-terraza1">0443</div>
                    <div className="cell-terraza1">0444</div>
                    <div className="cell-terraza1">0445</div>
                    <div className="cell-terraza1">0446</div>
                    <div className="cell-terraza1">0447</div>
                </div>
                <div className="service-labels-terraza1">
                    <span className="red-text-terraza1">TL JUAN RICARDO</span>
                </div>
                </div>

                <div className="cx-telepizza-section-terraza1">
                <div className="section-title-terraza1">CX tele*H telepizza</div>
                <div className="grid-row-terraza1">
                    <div className="cell-terraza1 red-terraza1">041</div>
                    <div className="cell-terraza1 red-terraza1">0459</div>
                    <div className="cell-terraza1 red-terraza1">0460</div>
                    <div className="cell-terraza1">0461</div>
                    <div className="cell-terraza1">0462</div>
                    <div className="cell-terraza1">0463</div>
                    <div className="cell-terraza1">0464</div>
                    <div className="cell-terraza1">0465</div>
                    <div className="cell-terraza1">0466</div>
                    <div className="cell-terraza1">0467</div>
                    <div className="cell-terraza1">0468</div>
                    <div className="cell-terraza1">0469</div>
                    <div className="cell-terraza1 red-terraza1">0470</div>
                </div>
                <div className="grid-row-terraza1">
                    <div className="cell-terraza1 red-terraza1">042</div>
                    <div className="cell-terraza1">0482</div>
                    <div className="cell-terraza1">0483</div>
                    <div className="cell-terraza1">0484</div>
                    <div className="cell-terraza1">0485</div>
                    <div className="cell-terraza1">0486</div>
                    <div className="cell-terraza1">0487</div>
                    <div className="cell-terraza1">0488</div>
                    <div className="cell-terraza1">0489</div>
                    <div className="cell-terraza1">0490</div>
                    <div className="cell-terraza1">0491</div>
                    <div className="cell-terraza1">0492</div>
                    <div className="cell-terraza1 red-terraza1">0493</div>
                </div>
                <div className="service-labels-terraza1">
                    <span>Isasma</span>
                    <span className="red-text-terraza1">CX SIMYO</span>
                </div>
                </div>

                <div className="bottom-right-section-terraza1">
                <div className="grid-row-terraza1">
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
                    <div key={num} className="cell-terraza1 blue-terraza1">
                        {num}
                    </div>
                    ))}
                </div>
                <div className="bottom-labels-terraza1">
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

