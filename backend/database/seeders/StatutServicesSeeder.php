<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class StatutServicesSeeder extends Seeder
{
    public function run()
    {
        $items = [
            [
                'icon' => 'wrench',
                'title' => 'Installation & Maintenance',
                'description' => 'Installation, maintenance et support des systèmes de sécurité (alarmes, vidéosurveillance, contrôle d\'accès).',
                'features' => [
                    'Installation sur site',
                    'Contrats de maintenance',
                    'Support technique',
                ],
            ],
            [
                'icon' => 'camera',
                'title' => 'Vidéosurveillance & Télésurveillance',
                'description' => 'Fourniture et mise en place de systèmes de vidéosurveillance et télésurveillance.',
                'features' => [
                    'Caméras HD/4K',
                    'Enregistrement sécurisé',
                    'Supervision à distance',
                ],
            ],
            [
                'icon' => 'lock',
                'title' => 'Contrôle d\'Accès & Alarmes',
                'description' => 'Systèmes de contrôle d\'accès, solutions biométriques et alarmes anti-intrusion.',
                'features' => [
                    'Contrôle biométrique',
                    'Badging et gestion des accès',
                    'Détection d\'intrusion',
                ],
            ],
            [
                'icon' => 'fire',
                'title' => 'Sécurité Incendie & Extinction',
                'description' => 'Solutions de détection incendie et systèmes d\'extinction conformes aux normes.',
                'features' => [
                    'Détection précoce',
                    'Systèmes d\'extinction automatiques',
                    'Conformité règlementaire',
                ],
            ],
            [
                'icon' => 'users',
                'title' => 'Gardiennage & Agents de Sécurité',
                'description' => 'Mise à disposition d\'agents de sécurité et services de gardiennage.',
                'features' => [
                    'Patrouilles',
                    'Surveillance statique',
                    'Gestion des incidents',
                ],
            ],
            [
                'icon' => 'globe',
                'title' => 'Import / Export & Commerce',
                'description' => 'Import-export de matériels, négoce et commercialisation de produits liés à la sécurité.',
                'features' => [
                    'Fourniture d\'équipements',
                    'Distribution nationale',
                    'Conseil en achat',
                ],
            ],
            [
                'icon' => 'star',
                'title' => 'Conseil, Formation & Audit',
                'description' => 'Audit de sécurité, conseil et formation professionnelle dans le domaine de la sécurité et informatique.',
                'features' => [
                    'Audits de sécurité',
                    'Formations professionnelles',
                    'Plans de sécurité',
                ],
            ],
        ];

        foreach ($items as $it) {
            // create or update services without position
            Service::updateOrCreate(['title' => $it['title']], $it);
        }
    }
}
