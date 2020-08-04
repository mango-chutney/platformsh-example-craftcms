self: super: rec {
  nodejs = super.pkgs.nodejs-10_x;
  yarn = (super.yarn.override ({ nodejs = super.pkgs.nodejs-10_x; }));
}
