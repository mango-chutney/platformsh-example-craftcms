self: super: rec {
  fontcustom = super.callPackage ./fontcustom {
    sfnt2woff-zopfli = super.callPackage ./sfnt2woff-zopfli {};
    # Fontforge in unstable segfaults when using python scripts, on macOS at
    # least.  Workaround by building current HEAD.
    fontforge = super.pkgs.fontforge.overrideAttrs (attrs: {
      name = "fontforge";
      version = "2018-07-25";
      src = super.pkgs.fetchFromGitHub {
        owner = "fontforge";
        repo = "fontforge";
        rev = "e688b8c4dc634dcc128709f84b98f2407294f3fb";
        sha256 = "1fsq7af9gx3bdfixd29ssx0jb1wnsild1pivjdrhkig74ikzxz8r";
      };
    });
  };
  nodejs = super.pkgs.nodejs-10_x;
  yarn = (super.yarn.override ({ nodejs = super.pkgs.nodejs-10_x; }));
}
