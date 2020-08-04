{ stdenv, fetchFromGitHub }:

stdenv.mkDerivation rec {
  name = "nixpkgs-unstable-${version}";
  version = "2018-07-17";

  # nix-prefetch-git git@github.com:mango-chutney/nixpkgs.git --rev refs/heads/nixpkgs-unstable
  src = fetchFromGitHub {
    owner = "mango-chutney";
    repo = "nixpkgs";
    rev = "6e76a618fb5d0033b06b45e64649707c6d38ddae";
    sha256 = "1hlq1n115phbnw07mnf54z0bvlny35xz5chd352pw1ykjxyydp7x";
  };

  dontBuild = true;
  preferLocalBuild = true;

  installPhase = ''
    cp -a . $out
  '';
}
