
self: super: rec {
  yarn = (super.yarn.override ({ nodejs = super.pkgs.nodejs-10_x; }));
}
