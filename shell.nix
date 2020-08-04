{ nixpkgs ? <nixpkgs>, system ? builtins.currentSystem }:

let

  nixpkgsLocal = import nixpkgs { inherit system; };

  nixpkgsUnstable = import (nixpkgsLocal.callPackage ./nix/nixpkgs.nix {}) {
    inherit system;
    overlays = [
      (import ./nix/overlay.nix)
    ];
  };

in with nixpkgsUnstable; stdenv.mkDerivation rec {
  name = "steptember-app-env";
  env = buildEnv { name = name; paths = buildInputs; };
  buildInputs = (import ./nix/make-build-inputs.nix { inherit pkgs; });
}
