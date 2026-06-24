<?php
// Fix Laravel's base path resolution on Vercel so /api isn't stripped
$_SERVER['SCRIPT_NAME'] = '/index.php';
$_SERVER['SCRIPT_FILENAME'] = __DIR__ . '/../public/index.php';

// Fix Vercel Serverless PHP stripping the Authorization header
if (isset($_SERVER['HTTP_X_AUTHORIZATION']) && !isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $_SERVER['HTTP_AUTHORIZATION'] = $_SERVER['HTTP_X_AUTHORIZATION'];
}

require __DIR__ . '/../public/index.php';
