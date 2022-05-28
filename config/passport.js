const passport = require("passport");

const localStrategy = require("passport-local").Strategy;
const Staff = require("../Models/staff");
passport.serializeUser((emp, done) => {
  return done(null, emp.id);
});

passport.deserializeUser((id, done) => {
  Staff.findById(id, (error, emp) => {
    return done(error, emp);
  });
});
passport.use(
  "local-signin",
  new localStrategy(
    {
      usernameField: "email", //field name in the schema
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      Staff.findOne({ empEmail: email }, (error, emp) => {
        if (error) {
          console.log("error");
          return done(error, false);
        } else {
          if (!emp) {
            console.log("!user");
            return done(
              null,
              false,
              req.flash("loginErrors", "This user not found")
            );
          } else {
            console.log("wsalt");
            if (!emp.comparePassword(password)) {
              console.log("!password");
              return done(
                null,
                false,
                req.flash("loginErrors", "Wrong Password")
              );
            } else {
              console.log("success");
              return done(null, emp);
            }
          }
        }
      });
    }
  )
);
