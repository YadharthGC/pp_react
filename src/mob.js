import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { Checkbox } from "@mui/material";
import { storage } from "./firebase";
import MobileFriendlyTwoToneIcon from "@mui/icons-material/MobileFriendlyTwoTone";
import Collapsible from "react-collapsible";
import WebIcon from "@mui/icons-material/Web";

function Mob() {
  const [name, setname] = useState([]);
  const [mobile, setmobile] = useState([]);
  const [gmail, setgmail] = useState([]);
  const [dob, setdob] = useState([]);
  const [job, setjob] = useState([]);
  const [citya, setcitya] = useState("");
  const [cityb, setcityb] = useState("");
  const [cityc, setcityc] = useState("");
  const [datas, setdatas] = useState([]);
  const [image, setimage] = useState(null);
  const navigate = useNavigate();

  useEffect(async () => {
    await fetch();
  }, [datas]);

  let fetch = async () => {
    try {
      let get = await axios.get("https://yadharthpp.herokuapp.com/datas");
      setdatas([...get.data]);
    } catch (error) {
      console.log(error);
    }
  };

  let handlesubmit = async (e) => {
    try {
      e.preventDefault();
      const uploadtask = storage.ref(`images/${image.name}`).put(image);
      uploadtask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log("error32");
        },
        () => {
          try {
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(async (url) => {
                try {
                  console.log(url);
                  let post = await axios.post(
                    "https://yadharthpp.herokuapp.com/post",
                    {
                      name,
                      gmail,
                      dob,
                      mobile,
                      job,
                      url,
                      citya,
                      cityb,
                      cityc,
                    }
                  );
                  window.alert(post.data.message);
                } catch (error) {
                  console.log("erorre");
                  console.log(error);
                }
              });
          } catch (error) {
            console.log("storage error");
            console.log(error);
          }
        }
      );
    } catch (error) {
      console.log("handlesubmit error");
      console.log("error");
    }
  };

  let handledel = async (id) => {
    try {
      let del = await axios.post(`https://yadharthpp.herokuapp.com/del/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="heading" id="head" style={{ textAlign: "center" }}>
        <span style={{ fontSize: "25px" }}>Mobile-view</span>
        <Link to="/">
          <WebIcon />
        </Link>
      </div>
      <div className="mobregister">
        <div className="mobbox">
          <div className="heading" id="head">
            Registration
          </div>
          <form
            onSubmit={(i, e) => {
              handlesubmit(i, e);
            }}
          >
            <div className="namepic">
              <div className="name">
                <div className="heading">Full Name</div>
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="pic">
                <div className="heading">Upload Profilepicture</div>
                <div>
                  <input
                    type="file"
                    id="pic"
                    accept=".jpg,.jpeg,.png"
                    onChange={(i) => {
                      setimage(i.target.files[0]);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mobilegmail">
              <div className="mobile">
                <div className="heading">Contact no.</div>
                <div>
                  <input
                    type="text"
                    placeholder="Contact no."
                    id="mobile"
                    value={mobile}
                    onChange={(e) => {
                      setmobile(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="gmail">
                <div className="heading">Email</div>
                <div>
                  <input
                    type="text"
                    placeholder="Gmail"
                    id="gmail"
                    value={gmail}
                    onChange={(e) => {
                      setgmail(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="jobdob">
              <div className="job">
                <div className="heading">JobType</div>
                <div>
                  <select
                    id="job"
                    value={job}
                    onChange={(e) => {
                      setjob(e.target.value);
                    }}
                  >
                    <option value="">JobType</option>
                    <option value="Full_Time">Full-Time</option>
                    <option value="Part_Time">Part-time</option>
                    <option value="Consultant">Consultant</option>
                  </select>
                </div>
              </div>
              <div className="dob">
                <div className="heading">D.O.B</div>
                <div>
                  <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => {
                      setdob(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="location">
              <div className="heading">Preferred Location</div>
              <div className="locations">
                <div className="chennai">
                  <Checkbox
                    id="chennai"
                    value="Chennai"
                    onChange={(e) => {
                      if (e.target.checked === true) {
                        setcitya("Chennai");
                      } else {
                        setcitya("");
                      }
                    }}
                  />
                  <label for="chennai">Chennai</label>
                </div>
                <div className="noida">
                  <Checkbox
                    id="chennai"
                    value="Chennai"
                    onChange={(e) => {
                      if (e.target.checked === true) {
                        setcityb("Noida");
                      } else {
                        setcityb("");
                      }
                    }}
                  />
                  <label for="chennai">Noida</label>
                </div>
                <div className="bangalore">
                  <Checkbox
                    id="chennai"
                    value="Chennai"
                    onChange={(e) => {
                      if (e.target.checked === true) {
                        setcityb("Bangalore");
                      } else {
                        setcityb("");
                      }
                    }}
                  />
                  <label for="chennai">Bangalore</label>
                </div>
              </div>
            </div>
            <div className="submit">
              <input type="submit" value="submit" />
            </div>
          </form>
        </div>
      </div>

      <div className="mobregister">
        <div className="mobbox">
          <div className="heading" id="head">
            Candidates
          </div>
          {datas.map((data) => {
            return (
              <div className="final">
                <Collapsible trigger={data.name}>
                  <div className="row" id="row">
                    <div className="col-lg-12" style={{ textAlign: "center" }}>
                      <div>{data.gmail}</div>
                      <div>{data.mobile}</div>
                      <div>{data.dob}</div>
                      <div>{data.job}</div>
                      <div className="flex">
                        <button type="button" class="btn btn-warning" id="but">
                          Edit
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger"
                          style={{ marginLeft: "1%" }}
                          id="but"
                          onClick={() => {
                            handledel(data._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-12" style={{ textAlign: "center" }}>
                      <div>
                        <img src={data.url} />
                      </div>
                    </div>
                  </div>
                </Collapsible>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Mob;
