{ pkgs }:

with pkgs; [
  nodejs-10_x
  php72Packages.composer
  yarn
]
