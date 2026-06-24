<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServicesSeeder extends Seeder
{
    public function run()
    {
        $items = [
            [
                'icon' => 'shield',
                'title' => 'Systèmes de Sécurité Intégrés',
                'description' => 'Solutions complètes de sécurité adaptées à vos besoins spécifiques.',
            ],
            [
                'icon' => 'camera',
                'title' => 'Vidéosurveillance HD/4K',
                'description' => 'Systèmes de surveillance vidéo haute définition avec intelligence artificielle.',
            ],
            [
                'icon' => 'lock',
                'title' => "Contrôle d'Accès Biométrique",
                'description' => "Systèmes de contrôle d'accès avancés pour sécuriser vos locaux.",
            ],
            [
                'icon' => 'fire',
                'title' => 'Détection et Extinction Incendie',
                'description' => 'Systèmes de sécurité incendie conformes aux normes internationales.',
            ],
            [
                'icon' => 'users',
                'title' => 'Services de Gardiennage',
                'description' => 'Agents de sécurité qualifiés pour la protection de vos biens.',
            ],
            [
                'icon' => 'wrench',
                'title' => 'Maintenance et Support',
                'description' => "Services de maintenance pour garantir le bon fonctionnement de vos équipements.",
            ],
        ];

        foreach ($items as $it) {
            Service::updateOrCreate(['title' => $it['title']], $it);
        }
    }
}
