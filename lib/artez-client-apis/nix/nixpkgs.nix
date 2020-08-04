{ stdenv, fetchFromGitHub }:

stdenv.mkDerivation rec {
  name = "nixpkgs-unstable-${version}";
  version = "2018-06-26";

  # nix-prefetch-git git@github.com:mango-chutney/nixpkgs.git --rev refs/heads/nixpkgs-unstable
  src = fetchFromGitHub {
    owner = "mango-chutney";
    repo = "nixpkgs";
    rev = "5ac6ab091a4883385e68571425fb7fef4d74c207";
    sha256 = "0rksyhnnj5028n2ql3jkf98vpd8cs1qf6rckgvx9jq2zf1xqsbla";
  };

  dontBuild = true;
  preferLocalBuild = true;

  installPhase = ''
    cp -a . $out
  '';
}
