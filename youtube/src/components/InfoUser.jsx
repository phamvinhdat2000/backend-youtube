import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  getUserById,
  updateUser,
} from "../services/user.service";
import { uploadInfVideo, uploadVideo } from "../services/video.service";

const InfoUser = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [inputValues, setInputValues] = useState({
    full_name: "",
    email: "",
  });
  const [avatar, setAvatar] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      let data = await getUserById(id);
      setChannelDetail(data);
      setInputValues({ full_name: data.full_name, email: data.email });
      setAvatar(data.avatar);
    })();
  }, [id]);


  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <div className="p-5" style={{ minHeight: "95vh" }}>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Info
          </button>
          <button
            className="nav-link"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            Upload video
          </button>
        </div>
      </nav>
      <div className="tab-content mt-3" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
          tabIndex={0}
        >
          <div className="row">
            <div className="col-2">
              <img
                className="rounded-circle"
                width={"180px"}
                height={"180px"}
                src={
                  !avatar
                    ?
                        "http://dergipark.org.tr/assets/app/images/buddy_sample.png"
                    : avatar
                }
              />
              <input className="form-control" type="file" id="formFile" />
              <p className="text-danger mt-2">File phải là các định dạng sau: .jpg,.png,.jpeg và phải dưới 3Mb</p>
            </div>
            <div className=" col-10">
              <form className="row g-3 text-white">
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Full name
                  </label>
                  <input
                    type="fullName"
                    className="form-control"
                    id="inputFullName"
                    value={inputValues.full_name}
                    onChange={handleOnChange}
                    name="full_name"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    value={inputValues.email}
                    onChange={handleOnChange}
                    name="email"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    value={channelDetail?.pass_word}
                    disabled
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputState" className="form-label">
                    State
                  </label>
                  <select id="inputState" className="form-select">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>

                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      let full_name =
                        document.getElementById("inputFullName").value;
                      let email = document.getElementById("inputEmail").value;
                      let pass_word =
                        document.getElementById("inputPassword").value;
                      let avatar = document.getElementById("formFile").files[0];
                      console.log(document.getElementById("formFile").files);
                      console.log(avatar);
                      const formData = new FormData();
                      formData.append("avatar", avatar);
                      formData.append("email", email);
                      formData.append("full_name", full_name);

                      updateUser(id, formData)
                        .then((result) => {
                          if (!result.avatar) {
                            setAvatar(
                              "http://dergipark.org.tr/assets/app/images/buddy_sample.png"
                            );
                          }
                          setAvatar(result.avatar);
                          window.location.href = `/info/${id}`;
                        })
                        .catch((error) => alert("Update failed"));
                    }}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
          tabIndex={0}
        >
          <div className="row">
            <div className="col-2 text-white">
              <label htmlFor="inputEmail4" className="form-label">
                Thumbnail
              </label>
              <img
                src="https://cdn.icon-icons.com/icons2/495/PNG/512/video-clip-3_icon-icons.com_48391.png"
                width="100%"
              />
              <input className="form-control" type="file" id="formFile1" />
              <p className="text-danger mt-2">*(bắt buộc): File phải là các định dạng sau: .jpg,.png,.jpeg và phải dưới 3Mb</p>
            </div>
            <div className=" col-6">
              <form className="row g-3 text-white">
                <div className="col-md-12">
                  <label htmlFor="inputEmail4" className="form-label">
                    Video name
                  </label>
                  <input
                    type="videoName"
                    className="form-control"
                    id="videoName"
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="inputState" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="description"
                    className="form-control"
                    id="description"
                  ></textarea>
                </div>

                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      let video_name =
                        document.getElementById("videoName").value;
                      let description =
                        document.getElementById("description").value;
                      let thumbnail =
                        document.getElementById("formFile1").files[0];
                      let video = document.getElementById("formFile2").files[0];
                      let formData1 = new FormData();
                      formData1.append("video_name", video_name);
                      formData1.append("description", description);
                      formData1.append("thumbnail", thumbnail);
                      if (video) {
                        (async () => {
                          let dataInfVideo = await uploadInfVideo(
                            id,
                            formData1
                          );
                          if (dataInfVideo) {
                            let formData2 = new FormData();
                            formData2.append("video", video);
                            (async () => {
                              let dataVideo = await uploadVideo(id, formData2);
                              if (dataVideo) {
                                alert("Tạo video thành công");
                                document.getElementById("videoName").value = "";
                                document.getElementById("description").value =
                                  "";
                              } else {
                                alert("Tạo video thất bại");
                                throw new Error("Tạo video thất bại");
                              }
                            })();
                          } else {
                            alert("Tạo video thất bại");
                            throw Error("data info is required");
                          }
                        })();
                      } else {
                        alert("Tạo video thất bại");
                      }
                    }}
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>

            <div className="col-4 text-white">
              <label htmlFor="inputEmail4" className="form-label">
                Source
              </label>

              <input className="form-control" type="file" id="formFile2" />
              <ReactPlayer url={`null`} className="react-player" controls />
              <p className="text-danger mt-2">*(bắt buộc): File phải là định dạng sau: .mp4 và phải dưới 15Mb</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoUser;
