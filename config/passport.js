const passport = require("passport");

const localStrategy = require("passport-local").Strategy;
const Staff = require("../Models/staff");
passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Staff.findById(id, (error, user) => {
    if (error) {
      console.log(error);
    } else return done(error, user);
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
      Staff.findOne({ empEmail: email }, (error, user) => {
        if (error) {
          console.log("error");
          return done(error, false);
        } else {
          if (!user) {
            console.log("!user");
            return done(
              null,
              false,
              req.flash("loginErrors", "This user not found")
            );
          } else {
            console.log("wsalt");
            if (user.isFirstTime == true) {
              const updating = {
                empPassword: new Staff().hashPassword(password),
                isFirstTime: false,
              };
              Staff.updateOne(
                { empEmail: user.empEmail },
                { $set: updating },
                (error, result) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(result);
                    Staff.updateOne(
                      { empEmail: user.empEmail },
                      { $set: { isLogged: true } },
                      (error, result) => {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log(result)
                          return done(null, user);
                        }
                      }
                    );
                  }
                }
              );
            } else if (!user.comparePassword(password)) {
              console.log("!password");
              return done(
                null,
                false,
                req.flash("loginErrors", "Wrong Password")
              );
            } else {
              console.log("success");
              Staff.updateOne(
                { empEmail: email },
                { $set: { isLogged: true } },
                (error, result) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(result)
                    return done(null, user);
                  }
                }
              );
            }
          }
        }
      });
    }
  )
);
