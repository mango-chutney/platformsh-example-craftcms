<?php
/**
 * Database Configuration
 *
 * All of your system's database connection settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/DbConfig.php.
 */

use Platformsh\ConfigReader\Config;

$config = new Config();

if ($config->isValidPlatform()) {
  if ($config->hasRelationship('database')) {
    $credentials = $config->credentials('database');

    return [
        'driver' => $credentials['scheme'],
        'server' => $credentials['host'],
        'user' => $credentials['username'],
        'password' => $credentials['password'],
        'database' => $credentials['path'],
        'schema' => '',
        'tablePrefix' => getenv('DB_TABLE_PREFIX'),
        'port' => $credentials['port']
    ];
  }
}


return [
    'driver' => getenv('DB_DRIVER'),
    'server' => getenv('DB_SERVER'),
    'user' => getenv('DB_USER'),
    'password' => getenv('DB_PASSWORD'),
    'database' => getenv('DB_DATABASE'),
    'schema' => getenv('DB_SCHEMA'),
    'tablePrefix' => getenv('DB_TABLE_PREFIX'),
    'port' => getenv('DB_PORT')
];
