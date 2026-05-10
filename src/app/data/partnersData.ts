import type { Partner, TeamMember, TimelineEvent } from '../types'

export const partnersData: Partner[] = [
  {
    id: 'fagou-logistics',
    nameFr: 'FAGOU Logistics',
    nameEn: 'FAGOU Logistics',
    descriptionFr:
      'Filiale logistique de FAGOU SRL, spécialisée dans le transport réfrigéré et la gestion de conteneurs entre l\'Europe et l\'Afrique.',
    descriptionEn:
      'Logistics subsidiary of FAGOU SRL, specializing in refrigerated transport and container management between Europe and Africa.',
    logo: 'https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=200&q=80',
    country: 'Belgique',
  },
  {
    id: 'africom-distribution',
    nameFr: 'AfriCom Distribution',
    nameEn: 'AfriCom Distribution',
    descriptionFr:
      'Partenaire de distribution en Afrique de l\'Ouest et centrale, réseau de 200+ points de vente.',
    descriptionEn:
      'Distribution partner in West and Central Africa, network of 200+ points of sale.',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80',
    country: 'Côte d\'Ivoire',
  },
  {
    id: 'euro-fresh',
    nameFr: 'EuroFresh BV',
    nameEn: 'EuroFresh BV',
    descriptionFr:
      'Fournisseur européen de légumes frais et de pommes de terre calibrées, certifié GlobalGAP.',
    descriptionEn:
      'European supplier of fresh vegetables and calibrated potatoes, GlobalGAP certified.',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80',
    country: 'Pays-Bas',
  },
]

export const teamData: TeamMember[] = [
  {
    id: 'ceo',
    nameFr: 'Direction Générale',
    nameEn: 'General Management',
    roleFr: 'Directeur Général',
    roleEn: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    id: 'export-director',
    nameFr: 'Responsable Export',
    nameEn: 'Export Manager',
    roleFr: 'Directeur des Exportations',
    roleEn: 'Export Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    id: 'commercial-manager',
    nameFr: 'Responsable Commercial',
    nameEn: 'Commercial Manager',
    roleFr: 'Responsable Développement Commercial',
    roleEn: 'Business Development Manager',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
  },
]

export const timelineData: TimelineEvent[] = [
  {
    year: '2013',
    titleFr: 'Fondation de FAGOU SRL',
    titleEn: 'FAGOU SRL Founded',
    descriptionFr: 'Création de FAGOU SRL à Bruxelles, Belgique, avec pour mission de connecter les marchés européens et africains.',
    descriptionEn: 'FAGOU SRL established in Brussels, Belgium, with the mission of connecting European and African markets.',
  },
  {
    year: '2015',
    titleFr: 'Premiers exports vers l\'Afrique',
    titleEn: 'First exports to Africa',
    descriptionFr: 'Lancement des premières exportations régulières vers l\'Afrique centrale avec les produits laitiers et les légumes.',
    descriptionEn: 'Launch of the first regular exports to Central Africa with dairy products and vegetables.',
  },
  {
    year: '2017',
    titleFr: 'Extension de la gamme produits',
    titleEn: 'Product range extension',
    descriptionFr: 'Ajout des viandes bovines, porcines et de volaille congelées à notre catalogue d\'exportation.',
    descriptionEn: 'Addition of frozen beef, pork, and poultry to our export catalogue.',
  },
  {
    year: '2019',
    titleFr: 'Certifications qualité européennes',
    titleEn: 'European quality certifications',
    descriptionFr: 'Obtention des certifications qualité européennes pour l\'ensemble de la chaîne d\'approvisionnement.',
    descriptionEn: 'Obtaining European quality certifications for the entire supply chain.',
  },
  {
    year: '2021',
    titleFr: 'Expansion en Afrique de l\'Ouest',
    titleEn: 'West Africa expansion',
    descriptionFr: 'Extension des activités à l\'Afrique de l\'Ouest avec de nouveaux partenaires distributeurs.',
    descriptionEn: 'Expansion of activities to West Africa with new distribution partners.',
  },
  {
    year: '2024',
    titleFr: '13+ ans d\'excellence',
    titleEn: '13+ years of excellence',
    descriptionFr: 'Plus de 13 ans d\'expérience, 22 produits, 9 catégories, présence sur 2 continents.',
    descriptionEn: 'Over 13 years of experience, 22 products, 9 categories, presence on 2 continents.',
  },
]
