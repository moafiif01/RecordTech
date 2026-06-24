<?php

return [
    /*
    |
    | View Storage Paths
    |
    */
    'paths' => [
        resource_path('views'),
    ],

    /*
    |
    | Compiled Path
    |
    */
    'compiled' => env(
        'VIEW_COMPILED_PATH',
        realpath(storage_path('framework/views'))
    ),
];
