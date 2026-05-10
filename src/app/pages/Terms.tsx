import { useLanguage } from '../hooks/useLanguage'

export default function Terms() {
  const { t } = useLanguage()

  const articles = [
    {
      fr: "Sauf convention contraire et constatée par écrit, toutes nos ventes de marchandises et/ou prestations de services, et toutes autres conventions annexes ou connexes sont conclues sous les présentes Conditions Générales de Vente.",
      en: "Unless otherwise agreed in writing, all our sales of goods and/or services, and all other ancillary or related agreements, are concluded under these General Terms of Sale.",
    },
    {
      fr: "Tous nos contrats de vente sont être formés et conclus en notre établissement.",
      en: "All our sales contracts are formed and concluded at our establishment.",
    },
    {
      fr: "La modification d'une ou plusieurs conditions rédigées ci-dessous par des conditions particulières n'est valable que pour l'opération pour laquelle elle a été convenue par les parties. Elle n'a pas d'effet rétroactif et n'est valable, pour des opérations ultérieures, que si elle a été renouvelée expressément à l'occasion de chaque nouvelle commande. Cette modification particulière n'entraîne aucun changement quant aux autres conditions qui restent de stricte application.",
      en: "The modification of one or more of the conditions set out below by means of special conditions shall only be valid for the transaction for which it was agreed between the parties. It has no retroactive effect and is only valid for subsequent transactions if it has been expressly renewed on the occasion of each new order. Such a particular modification does not entail any change to the other conditions which remain strictly applicable.",
    },
    {
      fr: "L'existence de clauses contractuelles dérogeant en partie ou en entier à certaines dispositions des présentes conditions générales n'affecte en rien les autres dispositions ni les parties auxquelles il n'a pas été dérogé.",
      en: "The existence of contractual clauses derogating in part or in full from certain provisions of these general conditions does not affect in any way the other provisions or the parties from which no derogation has been made.",
    },
    {
      fr: "En cas de divergences entre nos conditions générales et celle de l'acheteur, ce sont nos conditions générales qui prévalent.",
      en: "In the event of discrepancies between our general conditions and those of the buyer, our general conditions shall prevail.",
    },
    {
      fr: "Un contrat n'est formé et n'est conclu avec nous que s'il a fait l'objet d'une confirmation écrite de notre part par lettre, télécopie ou e-mail ou qu'après signature par l'acheteur ou le vendeur, selon le cas, de l'exemplaire du contrat ou de la facture que nous lui avons présenté.",
      en: "A contract is only formed and concluded with us if it has been confirmed in writing by us by letter, fax or e-mail, or after signature by the buyer or seller, as the case may be, of the copy of the contract or invoice that we have presented.",
    },
    {
      fr: "Nos marchandises sont vendues ferme et ne sont ni reprises ni échangées.",
      en: "Our goods are sold firm and are neither returned nor exchanged.",
    },
    {
      fr: "Tous nos prix sont libellés en euros (sauf notre indication écrite contraire) et hors taxes (sauf convention contraire formelle convenue par écrit).",
      en: "All our prices are denominated in euros (unless we indicate otherwise in writing) and exclusive of taxes (unless formally agreed otherwise in writing).",
    },
    {
      fr: "Sauf convention contraire expresse, nos factures doivent être réglées dans les quinze jours à compter de la date de facturation. Nous devons recevoir le montant facturé sur notre compte bancaire à la date d'échéance, sans déduction de frais de virement et de paiement. Tout paiement qui n'est pas effectué dans ce délai ou dans tout nouveau délai convenu donne lieu, à la charge de l'acheteur, à des intérêts de 1 % par mois à compter de la date d'échéance, toute période inférieure à un mois étant comptée pour un mois entier et sans qu'aucune mise en demeure préalable ne soit nécessaire.",
      en: "Unless expressly agreed otherwise, our invoices must be settled within fifteen days from the date of invoicing. We must receive the invoiced amount in our bank account by the due date, without deduction of transfer and payment charges. Any payment not made within this period or within any new agreed period shall give rise, at the buyer's expense, to interest of 1% per month from the due date, any period of less than one month being counted as a full month and without any prior formal notice being required.",
    },
    {
      fr: "Nous ne sommes pas tenus d'exécuter un contrat à un prix indiqué manifestement erroné suite à une faute de frappe ou d'écriture.",
      en: "We are not obliged to perform a contract at a price that is manifestly erroneous due to a typing or writing error.",
    },
    {
      fr: "L'acheteur garantit la prise de livraison de marchandises aux lieux et dates convenus.",
      en: "The buyer guarantees the taking of delivery of goods at the agreed places and dates.",
    },
    {
      fr: "Les obligations réciproques de l'acheteur et de FAGOU sprl sont régies par celui des Incoterms 2000 mentionné dans nos contrats, factures et offres.",
      en: "The reciprocal obligations of the buyer and FAGOU sprl are governed by the Incoterms 2000 mentioned in our contracts, invoices and offers.",
    },
    {
      fr: "L'expédition, qui peut se faire de façon fractionnée, s'effectue aux risques et périls ainsi qu'aux frais de l'acheteur. Même lorsque l'assurance est souscrite par FAGOU sprl au bénéfice de l'acheteur, FAGOU sprl ne supporte pas les risques de pertes ou de dommages postérieurs à la livraison, même pour ce qui concerne la franchise éventuelle. L'acheteur effectuera toutes les formalités en vue d'obtenir réparation à charge des assureurs.",
      en: "Shipment, which may be made in instalments, is carried out at the buyer's risk and expense. Even when insurance is taken out by FAGOU sprl for the benefit of the buyer, FAGOU sprl does not bear the risks of loss or damage after delivery, including with regard to any deductible. The buyer shall carry out all formalities in order to obtain compensation from the insurers.",
    },
    {
      fr: "Nous ne saurions être tenus responsables de quelque dommage que ce soit, sauf preuve contraire par l'acheteur, établissant que le dommage est la conséquence de notre faute ou de notre négligence ou de la faute ou négligence de nos préposés.",
      en: "We cannot be held responsible for any damage whatsoever, unless the buyer provides proof to the contrary, establishing that the damage is the consequence of our fault or negligence or the fault or negligence of our agents.",
    },
    {
      fr: "Dans tous les cas, notre responsabilité sera limitée au montant net de la facture, c'est-à-dire au prix, hors frais de transport et taxes, de la marchandise qui est objet de la transaction qui a donné lieu au dommage. Nous ne saurions en aucun cas être tenus responsables de manques à gagner, de dommages consécutifs et/ou de préjudices moraux.",
      en: "In all cases, our liability shall be limited to the net amount of the invoice, i.e. the price, excluding transport costs and taxes, of the goods that are the subject of the transaction that gave rise to the damage. We cannot under any circumstances be held liable for loss of profit, consequential damages and/or moral prejudice.",
    },
    {
      fr: "Nos délais de livraison sont donnés à titre purement indicatif et aussi exactement que possible. Les dépassements des délais ne peuvent donner lieu ni à dommages et intérêts ni à annulation des commandes en cours. En tout état de cause, les délais convenus seront prorogés en cas de grève totale ou partielle, de notre personnel, de nos fournisseurs, sous-traitants, etc. ; incendie ; inondation ; difficultés ou tous incidents généralement quelconques survenus entre les installations de nos fournisseurs et les nôtres, entre les installations de nos fournisseurs et celles de l'acheteur ou encore entre nos installations et celles de l'acheteur ; carences de nos fournisseurs ; toute autre cause considérée comme cas de force majeure ainsi que toute autre cause qui échappe à notre contrôle direct et personnel.",
      en: "Our delivery times are given for purely indicative purposes and as accurately as possible. Delays may not give rise to either damages or cancellation of orders in progress. In any event, the agreed deadlines shall be extended in the event of a total or partial strike by our staff, our suppliers, subcontractors, etc.; fire; flood; difficulties or any incidents of any kind occurring between our suppliers' facilities and our own, between our suppliers' facilities and those of the buyer, or between our facilities and those of the buyer; shortcomings on the part of our suppliers; any other cause considered to be a case of force majeure as well as any other cause beyond our direct and personal control.",
    },
    {
      fr: "En cas de survenance d'un cas de force majeure, nous avons le droit de suspendre l'exécution de nos contrats pendant la durée de l'événement constitutif de force majeure. Au cas où la durée ou l'ampleur de la force majeure le nécessiterait, et cela à notre seule et entière appréciation, nous avons la faculté de résilier tout contrat d'achat pour la partie qui reste à exécuter du contrat. Cette résiliation de notre part a lieu sans qu'aucune intervention judiciaire ne soit nécessaire et à l'exclusion de toute indemnisation à notre charge. En tous les cas, lorsque la force majeure dure plus d'un mois ou qu'il est prévisible qu'elle durera plus d'un mois, chaque partie à la faculté de résilier le contrat sans toutefois pouvoir prétendre à une indemnisation quelconque.",
      en: "In the event of force majeure, we have the right to suspend the performance of our contracts for the duration of the force majeure event. Should the duration or extent of the force majeure so require, at our sole and absolute discretion, we have the option of terminating any purchase contract for the remaining portion to be performed. Such termination on our part takes place without any judicial intervention being required and to the exclusion of any compensation on our part. In all cases, when force majeure lasts more than one month or when it is foreseeable that it will last more than one month, each party has the option of terminating the contract without, however, being entitled to claim any compensation.",
    },
    {
      fr: "Est considéré comme force majeure tout événement particulier qui rend impossible l'exécution de notre obligation de livraison et de prise de livraison ou qui est d'une nature si contraignante que cette livraison ou prise de livraison ne peut être raisonnablement exigée de notre part. Sont constitutifs de force majeure : les guerres, mobilisations, grèves, mouvements sociaux, révolution, émeutes, insurrection, échauffourées, tempête, embâcle, inondation, stagnation dans la fourniture d'électricité ou d'eau, incendie dans l'entreprise, immobilisation de la production suite à un bris de machine ou à des difficultés dans l'approvisionnement des flux énergétiques, entrave au trafic, mauvaise récolte partielle ou totale, sécheresse anormale, pluies incessantes, maladies affectant les végétaux, fléaux dus aux parasites, défaillance de fournisseurs, etc.",
      en: "Force majeure is considered to be any particular event that makes it impossible for us to perform our delivery and acceptance obligations, or that is of such a constraining nature that such delivery or acceptance cannot reasonably be required of us. The following constitute force majeure: wars, mobilisations, strikes, social movements, revolution, riots, insurrection, brawls, storms, ice jams, floods, stagnation in the supply of electricity or water, fire in the company, stoppage of production following a machine breakdown or difficulties in the supply of energy, traffic obstruction, partial or total crop failure, abnormal drought, incessant rain, diseases affecting vegetation, plagues due to pests, supplier failure, etc.",
    },
    {
      fr: "Les mesures des pouvoirs publics visant à restreindre les importations, exportations ou transit des marchandises vendues ou achetées ou à en relever le coût nous autorisent à résilier le contrat pour la partie qui reste à exécuter, à l'exclusion de toute indemnisation de notre part, ou à exiger du vendeur ou de l'acheteur réparation de notre préjudice consécutif à ces mesures, et cela, avant que nous ne procédions à la livraison ou à la prise de livraison.",
      en: "Measures taken by public authorities to restrict the import, export or transit of the goods sold or purchased, or to increase their cost, entitle us to terminate the contract for the remaining part to be performed, to the exclusion of any compensation on our part, or to require the seller or buyer to compensate us for the damage caused to us by such measures, and this before we proceed with delivery or take delivery.",
    },
    {
      fr: "Les factures non payées dans le délai convenu par écrit en dérogation à l'article 9 entraîneront automatiquement, à compter du lendemain de leur échéance et sans mise en demeure, dans le chef de l'acheteur, l'obligation de payer des intérêts de retard calculés sur base du taux d'intérêt fixé conformément à l'article 5 de la loi belge du 2 août 2002 concernant la lutte contre le retard de paiement dans les transactions commerciales, majoré de 2 pourcents. Le fait que les intérêts de retard soient ainsi portés en compte ne permet pas à l'acheteur de retarder ses paiements. Tout paiement non exécuté dans les quinze jours de l'envoi recommandé d'une mise en demeure, sera majoré d'une indemnité forfaitaire de 15% des sommes dues avec un minimum de 65 EUR et un maximum de 12.500 EUR.",
      en: "Invoices not paid within the period agreed in writing in derogation of article 9 shall automatically, from the day after their due date and without prior notice, give rise to an obligation on the part of the buyer to pay late payment interest calculated on the basis of the interest rate set in accordance with article 5 of the Belgian law of 2 August 2002 on combating late payment in commercial transactions, increased by 2 percent. The fact that late payment interest is charged in this way does not allow the buyer to delay its payments. Any payment not made within fifteen days of the registered dispatch of a formal notice shall be increased by a flat-rate penalty of 15% of the sums owed, with a minimum of EUR 65 and a maximum of EUR 12,500.",
    },
    {
      fr: "Si une procédure judiciaire doit être engagée en vue d'obtenir le paiement de nos factures ou d'une indemnité de résolution de la vente aux torts de l'acheteur, ce dernier sera en outre tenu à nous payer tous les frais de recouvrement pertinents encourus par suite de retard de paiement, dont l'estimation ne pourra être inférieure à 15% des sommes dues.",
      en: "If legal proceedings must be initiated in order to obtain payment of our invoices or an indemnity for rescission of the sale at the buyer's fault, the latter shall also be required to pay us all relevant collection costs incurred as a result of the late payment, the estimate of which shall not be less than 15% of the amounts owed.",
    },
    {
      fr: "Au cas où nous obtiendrions gain de cause dans une procédure judiciaire ou arbitrale, l'acheteur notre cocontractant supportera tous les frais et coûts que nous avons exposés dans le cadre de cette procédure.",
      en: "In the event that we are successful in judicial or arbitration proceedings, the buyer, our contracting party, shall bear all expenses and costs that we have incurred in the context of such proceedings.",
    },
    {
      fr: "Les marchandises qui nous sont livrées ne doivent pouvoir porter atteinte à aucun brevet, droit d'auteur, dessin ou modèle enregistré, nom commercial, ni à aucune marque déposée ou licence. Le vendeur nous ayant vendu des marchandises nous garantit que nous et nos propres acheteurs de ces marchandises ne serons aucunement inquiétés par des revendications relatives à ces droits et qu'il réparera tout dommage corrélatif à ces revendications.",
      en: "The goods delivered to us must not infringe any patent, copyright, registered design or model, trade name, or any registered trademark or licence. The seller who has sold us goods guarantees that neither we nor our own buyers of those goods will be in any way disturbed by claims relating to these rights and that they will repair any damage correlating to such claims.",
    },
    {
      fr: "Vu le caractère périssable de produits, leur conservation dépend pour une grande part du mode d'entreposage et de préservation, dont nous ne sommes plus maîtres après la livraison. Pour ces raisons, l'acheteur est tenu, dès la livraison, de soumettre les marchandises présentées à la livraison à des opérations de contrôle destinées à constater si, selon lui, elles répondent aux spécifications contractuelles et aux normes de qualité convenues.",
      en: "Given the perishable nature of the products, their preservation depends to a large extent on the method of storage and preservation, which is no longer under our control after delivery. For these reasons, the buyer is required, upon delivery, to subject the goods presented for delivery to inspection operations intended to ascertain whether, in their opinion, they comply with the contractual specifications and the agreed quality standards.",
    },
    {
      fr: "L'acheteur doit examiner les marchandises ou les faire examiner dans un délai aussi bref que possible eu égard aux circonstances. Si FAGOU sprl ne doit pas, selon l'Incoterm choisi, conclure le contrat de transport, l'acheteur doit procéder ou faire procéder à l'examen des marchandises avant le transport. Si l'Incoterm choisi implique que FAGOU sprl doit conclure le contrat pour le transport de la marchandise, l'examen de celle-ci peut être différé jusqu'à son arrivée à destination. L'acheteur est déchu du droit de se prévaloir d'un éventuel défaut de conformité s'il ne l'a pas dénoncé à FAGOU sprl, en précisant la nature de ce défaut, dans un délai de 48 heures après l'expiration du délai prévu ci-dessus pour l'examen de la marchandise.",
      en: "The buyer must inspect the goods or have them inspected as promptly as possible given the circumstances. If FAGOU sprl is not required, under the chosen Incoterm, to conclude the contract of carriage, the buyer must inspect or have the goods inspected before transport. If the chosen Incoterm requires FAGOU sprl to conclude the contract for the carriage of the goods, the inspection may be deferred until arrival at destination. The buyer forfeits the right to invoke any lack of conformity if they have not notified FAGOU sprl of it, specifying the nature of the defect, within 48 hours after the expiry of the period provided above for inspection of the goods.",
    },
    {
      fr: "Toute réclamation de l'acheteur concernant la qualité et les quantités des marchandises fournies doit être présentée pendant la livraison, c.-à-d. avant ou durant leur chargement sur le moyen de transport mis à disposition par l'acheteur ou, en cas de livraison franco, avant leur déchargement, et en cas de vente maritime ou de vente impliquant un transport fluvial, avant leur chargement sur le premier navire/bateau transporteur.",
      en: "Any claim by the buyer concerning the quality and quantities of the goods supplied must be submitted during delivery, i.e. before or during their loading onto the means of transport made available by the buyer, or, in the case of free delivery, before their unloading, and in the case of maritime sale or sale involving river transport, before their loading onto the first carrier vessel/boat.",
    },
    {
      fr: "L'acheteur est forclos à présenter une réclamation dès lors qu'il a pris livraison des marchandises, c.-à-d. lorsque celles-ci sont chargées sur ses moyens de transport ou, en cas de livraison franco, déchargées au lieu de destination qu'il a indiqué. En cas de vente maritime ou de vente impliquant un transport fluvial, l'acheteur est forclos à présenter une réclamation au bout de deux jours ouvrables à compter de la date de la livraison selon les conditions de livraison convenues.",
      en: "The buyer is barred from submitting a claim once they have taken delivery of the goods, i.e. when they have been loaded onto their means of transport or, in the case of free delivery, unloaded at the destination indicated by the buyer. In the case of maritime sale or sale involving river transport, the buyer is barred from submitting a claim after two working days from the date of delivery under the agreed delivery conditions.",
    },
    {
      fr: "Lorsque les marchandises sont des produits d'alimentation que nous vendons et livrons assortis d'un certificat de police sanitaire, ou d'un certificat phytosanitaire ou encore d'un certificat de qualité émis par des autorités compétentes, des organismes agréés ou bureaux d'expertise agréés du pays d'expédition, la teneur du certificat émis fait, sauf preuve contraire de la part de l'acheteur, irrévocablement foi quant à la conformité ou non-conformité des marchandises aux normes de qualité convenues.",
      en: "When the goods are food products that we sell and deliver with a sanitary police certificate, a phytosanitary certificate, or a quality certificate issued by the competent authorities, approved bodies or approved expert offices of the country of dispatch, the content of the certificate issued shall constitute, unless the buyer provides proof to the contrary, irrefutable evidence as to the conformity or non-conformity of the goods with the agreed quality standards.",
    },
    {
      fr: "L'acheteur qui, au motif d'une prétendue mauvaise qualité, refuse de prendre livraison de nos marchandises est tenu de nous en informer immédiatement et, en tout état de cause, dans les six heures suivant son refus, par télécopie ou pdf document, envoyé par e-mail. Au cas où nous refuserions toute validité à la réclamation ou refuserions de la prendre en considération, l'acheteur est tenu, sous peine de déchéance de ses droits, de faire exécuter une expertise indépendante dans l'immédiat, c.-à-d. dans les douze heures.",
      en: "A buyer who, on the grounds of alleged poor quality, refuses to take delivery of our goods is required to inform us of this immediately and, in any event, within six hours of their refusal, by fax or pdf document sent by e-mail. Should we refuse to accept the validity of the claim or refuse to take it into consideration, the buyer is required, under penalty of forfeiture of their rights, to have an independent expert assessment carried out immediately, i.e. within twelve hours.",
    },
    {
      fr: "Au cas où nous résilierions le contrat pour les motifs précités, FAGOU sprl est tenus d'en informer l'acheteur par télécopie, ou pdf document envoyé par e-mail, ou lettre, sans qu'aucune autre formalité ne soit nécessaire.",
      en: "Should we terminate the contract for the aforementioned reasons, FAGOU sprl is required to inform the buyer by fax, or pdf document sent by e-mail, or letter, without any other formality being required.",
    },
    {
      fr: "L'acheteur est tenu de réparer en entier le dommage que nous subissons ou subirons du fait qu'il n'a pas pris livraison (totale) des marchandises que nous lui avons vendues. Dans tous les cas, la réparation consistera en la différence entre le prix convenu avec l'acheteur et le prix du jour à la date de sa défaillance ou non-exécution.",
      en: "The buyer is required to fully compensate us for the damage that we suffer or will suffer as a result of their failure to take (total) delivery of the goods that we have sold them. In all cases, the compensation shall consist of the difference between the price agreed with the buyer and the current market price on the date of their default or non-performance.",
    },
    {
      fr: "L'acheteur défaillant est tenu à réparation du seul fait qu'il n'a pas pris (à bonne date) livraison des marchandises.",
      en: "A defaulting buyer is liable for compensation solely because they have not taken delivery of the goods (on time).",
    },
    {
      fr: "La propriété du bien vendu n'est transférée à l'acheteur qu'après paiement intégral du montant de la facture. C'est dire que tous les produits qui sont livrés en exécution d'un contrat de vente demeurent notre propriété jusqu'au paiement intégral du prix de vente et de toutes les charges s'y rapportant et jusqu'à nous n'ayons plus aucune créance sur l'acheteur à quelque titre que ce soit.",
      en: "Ownership of the goods sold is not transferred to the buyer until full payment of the invoice amount. This means that all products delivered in performance of a sales contract remain our property until full payment of the purchase price and all charges relating thereto and until we have no further claims against the buyer for any reason whatsoever.",
    },
    {
      fr: "En cas de non-paiement, de paiement partiel ou de retard de paiement de la part de l'acheteur, en cas de déclaration de faillite, de sollicitation de concordat, demande ou attribution de cessation des paiements (moratoire) ou faillite (redressement judiciaire), de mise en liquidation de l'acheteur, de saisie partielle ou totale de ses avoirs ou de toute procédure prévue par le législateur en vigueur dans le pays de l'acheteur et dont les effets sont comparables aux procédures énoncées ci-avant, FAGOU sprl se réserve le droit de résilier ou de suspendre toute commande en cours ou non encore exécutée et, s'il y a lieu, de reprendre les marchandises livrées ou en cours de livraison.",
      en: "In the event of non-payment, partial payment or late payment on the part of the buyer, in the event of a declaration of bankruptcy, application for a moratorium, request or grant of a cessation of payments (moratorium) or bankruptcy (judicial reorganisation), the buyer's placement in liquidation, the partial or total seizure of the buyer's assets, or any procedure provided for by the legislation in force in the buyer's country and whose effects are comparable to the procedures set out above, FAGOU sprl reserves the right to terminate or suspend any order in progress or not yet executed and, where appropriate, to repossess the goods delivered or in the process of being delivered.",
    },
    {
      fr: "En cas de retard de paiement par l'acheteur, nous avons le droit de revendiquer et reprendre nos marchandises.",
      en: "In the event of late payment by the buyer, we have the right to reclaim and repossess our goods.",
    },
    {
      fr: "L'acheteur n'est pas autorisé à opérer des imputations ou compensations entre ses dettes envers nous et les créances qu'il a ou estime avoir sur nous, sauf lorsque nous avons émis en sa faveur un avoir (note de crédit) ou avons été condamnés par un prononcé arbitral ou judiciaire à lui payer une somme d'argent.",
      en: "The buyer is not authorised to set off or offset their debts to us against claims that they have or consider themselves to have against us, except where we have issued a credit note in their favour or have been ordered by an arbitral or judicial award to pay them a sum of money.",
    },
    {
      fr: "Tout non-paiement par l'acheteur du montant échu du prix de vente dans les 48 heures suivant la sommation que nous lui adresserons par lettre, télécopie ou email, nous donne le droit de demander réparation de l'intégralité du dommage que nous subissons du fait de l'inexécution par l'acheteur de ses obligations.",
      en: "Any non-payment by the buyer of the amount due on the sale price within 48 hours following the formal notice we send them by letter, fax or email, gives us the right to claim full compensation for the damage we suffer as a result of the buyer's failure to perform their obligations.",
    },
    {
      fr: "Les présentes Conditions Générales de Vente Export sont régies par le droit belge, en ce compris, pour les ventes internationales, la Convention des Nations Unies sur les contrats de vente internationale de marchandise, faite à Vienne le 11 avril 1980 et approuvée par la loi belge du 4 septembre 1996. Tout litige est, même en cas de connexité ou d'action en garantie ou en cas de pluralité de défendeurs, de la compétence exclusive des Tribunaux de Charleroi, où il sera traité en français.",
      en: "These Export General Terms of Sale are governed by Belgian law, including, for international sales, the United Nations Convention on Contracts for the International Sale of Goods, concluded in Vienna on 11 April 1980 and approved by the Belgian law of 4 September 1996. Any dispute shall be, even in the case of related actions, warranty claims or a plurality of defendants, under the exclusive jurisdiction of the Courts of Charleroi, where it shall be dealt with in French.",
    },
  ]

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '64px 24px 96px' }}>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '36px', marginBottom: '16px', color: '#1A1A1A' }}>
          {t('Conditions Générales de Vente', 'General Terms of Sale')}
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B7280', marginBottom: '28px' }}>
          FAGOU Sprl · www.fagou.be
        </p>
        <a
          href="conditions_fagou.pdf"
          download
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#1A5C1A',
            color: '#fff',
            borderRadius: '999px',
            padding: '12px 22px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          ↓ {t('Télécharger les conditions de vente (PDF)', 'Download terms of sale (PDF)')}
        </a>
      </div>

      {/* Articles */}
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#1A1A1A', lineHeight: 1.8 }}>
        {articles.map((article, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr',
              gap: '20px',
              padding: '20px 0',
              borderBottom: '1px solid #E5E7EB',
              alignItems: 'start',
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                fontSize: '11px',
                color: '#1A5C1A',
                letterSpacing: '0.12em',
                fontWeight: 500,
                paddingTop: '3px',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <p style={{ margin: 0 }}>{t(article.fr, article.en)}</p>
          </div>
        ))}
      </div>

      {/* Footer download */}
      <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end' }}>
        <a
          href="conditions_fagou.pdf"
          download
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            color: '#1A5C1A',
            border: '1px solid #1A5C1A',
            borderRadius: '999px',
            padding: '11px 22px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          ↓ {t('Télécharger le PDF', 'Download PDF')}
        </a>
      </div>
    </div>
  )
}
