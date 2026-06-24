<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustProxies as Middleware;
use Illuminate\Http\Request;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var array|string|null
     */
    // In local/testing environments it's safe to trust all proxies; in production set specific proxies.
    protected $proxies = '*';

    /**
     * The headers that should be used to detect proxies.
     * For local/test runs we use 0 (no forwarded headers) to avoid environment-specific constants.
     *
     * @var int
     */
    protected $headers = 0;
}
