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

function Page() {
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
        <span style={{ fontSize: "25px" }}>Web-view</span>
        <Link to="/mobile">
          <MobileFriendlyTwoToneIcon />
        </Link>
      </div>
      <div className="register">
        <div className="box">
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
      <div className="table">
        <div className="tabelbox">
          <table>
            <thead>
              <tr>
                <td className="key" id="keya">
                  Name
                </td>
                <td className="key" id="keyb">
                  Email
                </td>
                <td className="key" id="keyc">
                  Contact no.
                </td>
                <td className="key" id="keyd">
                  D.O.B
                </td>
                <td className="key" id="keye">
                  Job_type
                </td>
                <td className="key" id="keyf">
                  Action
                </td>
              </tr>
            </thead>
            <tbody>
              {datas.map((data) => {
                return (
                  <tr>
                    <td className="keyans">{data.name}</td>
                    <td className="keyans">{data.gmail}</td>
                    <td className="keyans">{data.mobile}</td>
                    <td className="keyans">{data.dob}</td>
                    <td className="keyans">{data.job}</td>
                    <td className="keyans">
                      <button class="btn btn-warning">Edit</button>

                      <button
                        class="btn btn-danger"
                        style={{ marginLeft: "1%" }}
                        onClick={() => {
                          handledel(data._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
