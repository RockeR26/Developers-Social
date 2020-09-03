//initialising dependencies
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const config = require("config");
const request = require("request");
const { check, validationResult } = require("express-validator");

const Profile = require("../models/Profile");
const User = require("../models/User");
const { response } = require("express");

// @route: Get /profile/me
// @desc:get profile of current user
// @acess:private
router.get("/me", authenticate, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user }).populate("user", [
      "name",
      "avatar",
    ]);
    if (!profile) {
      return res.status(400).json("Profile does note exist! Create Profile");
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
});

// @route: POST /profile
// @desc:create or update profile
// @acess:private
router.post(
  "/",
  [
    authenticate,
    [
      check("status", "status is required").not().isEmpty(),
      check("skills", "skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructuring body
    const {
      company,
      website,
      location,
      bio,
      status,
      skills,
      githubUsername,
      facebook,
      twitter,
      youtube,
      instagram,
      linkedin,
    } = req.body;

    //create or update a profile
    const profileFields = {};
    profileFields.user = req.user;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubUsername) profileFields.githubUsername = githubUsername;
    if (skills)
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    profileFields.social = {};
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (youtube) profileFields.social.youtube = youtube;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      res.status(500).json({ msg: "server error" });
    }
  }
);

// @route: Get /profile
// @desc:get all the profiles
// @acess:public
router.get("/", async (req, res) => {
  try {
    let profiles = await Profile.find({}).populate("user", ["name", "avatar"]);
    if (!profiles) {
      return res.status(400).json("There are no profiles");
    }
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
});

// @route: Get /profile/user/:user_id
// @desc:get user with  userid
// @acess:public
router.get("/user/:user_id", async (req, res) => {
  try {
    let profile = await Profile.find({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json("Profile not found");
    }
    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId")
      return res.status(400).json("Profile not found");
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

// @route: Delete /profile
// @desc:delete current profile ,user and posts at the same time
// @acess:private
router.delete("/", authenticate, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user });
    await User.findOneAndRemove({ _id: req.user });
    //posts delete
    res.json({ msg: "The User Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

// @route: Put /profile/experience
// @desc:add experience
// @acess:private
router.put(
  "/experience",
  [
    authenticate,
    [
      check("title", "title is required").not().isEmpty(),
      check("company", "company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      title,
      company,
      from,
      to,
      description,
      current,
      location,
    } = req.body;
    const newExp = {
      title,
      company,
      from,
      to,
      current,
      description,
      location,
    };
    try {
      let profile = await Profile.findOne({ user: req.user }).populate("user", [
        "name",
        "avatar",
      ]);
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "server error" });
    }
  }
);

// @route: Delete /profile/experience/:exp_id
// @desc:delete experience
// @acess:private
router.delete("/experience/:exp_id", authenticate, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user });
    //Remove Index
    const removeIndex = profile.experience
      .map((exp) => exp.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

// @route: Put /profile/education
// @desc:add education
// @acess:private
router.put(
  "/education",
  [
    authenticate,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "degree is required").not().isEmpty(),
      check("fieldOfStudy", "field is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { school, degree, fieldOfStudy, from, to, current } = req.body;
    const newEdu = {
      school,
      degree,
      from,
      to,
      current,
      fieldOfStudy,
    };
    try {
      let profile = await Profile.findOne({ user: req.user }).populate("user", [
        "name",
        "avatar",
      ]);
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "server error" });
    }
  }
);

// @route: Delete /profile/education/:edu_id
// @desc:delete experience
// @acess:private
router.delete("/education/:edu_id", authenticate, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user });
    //Remove Index
    const removeIndex = profile.education
      .map((edu) => edu.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

// @route: Get /profile/Github/:usr
// @desc:Get 5 repositories from client
// @acess:public
router.get("/github/:usr", (req, res) => {
  try {
    const options = {
      url:
        "https://api.github.com/users/" +
        req.params.usr +
        "/repos?per_page=5&sort=created:asc&client_id=" +
        config.get("ClientId") +
        "&client_secret=" +
        config.get("ClientSecret"),
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error.message);
      if (response.statusCode !== 200)
        return res
          .status(404)
          .json({ msg: "User with this username not found" });
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
