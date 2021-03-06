<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 */

use Platformsh\ConfigReader\Config;

$settings = [
    // Global settings
    '*' => [
        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 0,

        // Enable CSRF Protection (recommended, will be enabled by default in Craft 3)
        'enableCsrfProtection' => true,

        // Whether "index.php" should be visible in URLs
        'omitScriptNameInUrls' => true,

        // Control Panel trigger word
        'cpTrigger' => 'admin',

        'useProjectConfigFile' => true,

        'allowUpdates' => false,
    ],

    // Dev environment settings
    'dev' => [
        // Base site URL
        'siteUrl' => null,

        // Dev Mode (see https://craftcms.com/support/dev-mode)
        'devMode' => true,
    ],

    // Staging environment settings
    'staging' => [
        // Base site URL
        'siteUrl' => null,
    ],

    // Production environment settings
    'production' => [
        // Base site URL
        'siteUrl' => null,
    ],
];

$config = new Config();

if ($config->isValidPlatform()) {
    $settings['*']['allowAdminChanges'] = false;

    if (empty($settings['*']['securityKey'])) {
        $settings['*']['securityKey'] = $config->projectEntropy;
    }

    $routes = $config->routes();

    foreach ($routes as $url => $route) {
        $host = parse_url($url, PHP_URL_HOST);

        if ($host !== FALSE && $route['type'] == 'upstream' && $route['upstream'] == $config->applicationName) {
            $settings['*']['siteUrl'] = $host;
        }
    }
}

return $settings;
