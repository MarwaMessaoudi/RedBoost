import React from 'react'
import { useSelector } from 'react-redux'

function CommentSection() {
  const userData = useSelector((state) => state.userData.userData)
  return (
    <div className="container my-5 py-5" style={{ maxWidth: '100%' }}>
      <div className="row d-flex justify-content-center">
        <div className="col-md-12 col-lg-10 col-xl-12">
          <div className="card">
            <div className="card-body" style={{ overflow: 'auto', maxHeight: '300px' }}>
              <div className="card-container" style={{ marginBottom: '20px' }}>
                <div className="d-flex flex-start align-items-center">
                  <img
                    className="rounded-circle shadow-1-strong me-3"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                    alt="avatar"
                    width="60"
                    height="60"
                  />
                  <div>
                    <h6 className="fw-bold text-primary mb-1">Lily Coleman</h6>
                    <p className="text-muted small mb-0">Shared publicly - Jan 2020</p>
                  </div>
                </div>

                <p className="mt-3 mb-4 pb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip consequat.
                </p>

                <div className="small d-flex justify-content-start">
                  <a href="#!" className="d-flex align-items-center me-3">
                    <i className="far fa-thumbs-up me-2"></i>
                    <p className="mb-0">Like</p>
                  </a>
                  <a href="#!" className="d-flex align-items-center me-3">
                    <i className="far fa-comment-dots me-2"></i>
                    <p className="mb-0">Comment</p>
                  </a>
                  <a href="#!" className="d-flex align-items-center me-3">
                    <i className="fas fa-share me-2"></i>
                    <p className="mb-0">Share</p>
                  </a>
                </div>
              </div>
              <div className="card-container">
                <div className="d-flex flex-start align-items-center">
                  <img
                    className="rounded-circle shadow-1-strong me-3"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                    alt="avatar"
                    width="60"
                    height="60"
                  />
                  <div>
                    <h6 className="fw-bold text-primary mb-1">Lily Coleman</h6>
                    <p className="text-muted small mb-0">Shared publicly - Jan 2020</p>
                  </div>
                </div>

                <p className="mt-3 mb-4 pb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip consequat.
                </p>

                <div className="small d-flex justify-content-start">
                  <a href="#!" className="d-flex align-items-center me-3">
                    <i className="far fa-thumbs-up me-2"></i>
                    <p className="mb-0">Like</p>
                  </a>
                  <a href="#!" className="d-flex align-items-center me-3">
                    <i className="far fa-comment-dots me-2"></i>
                    <p className="mb-0">Comment</p>
                  </a>
                  <a href="#!" className="d-flex align-items-center me-3">
                    <i className="fas fa-share me-2"></i>
                    <p className="mb-0">Share</p>
                  </a>
                </div>
              </div>
            </div>
            <div className="card-footer py-3 border-0" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="d-flex flex-start w-100">
                <img
                  className="rounded-circle shadow-1-strong me-3"
                  src={userData.image}
                  alt="avatar"
                  width="40"
                  height="40"
                />
                <div data-mdb-input-init className="form-outline w-100">
                  <textarea
                    className="form-control"
                    id="textAreaExample"
                    rows="4"
                    style={{ background: '#fff' }}
                  ></textarea>
                  <label className="form-label" htmlFor="textAreaExample">
                    Message
                  </label>
                </div>
              </div>
              <div className="float-end mt-2 pt-1">
                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-sm"
                >
                  Post comment
                </button>
                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-outline-primary btn-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentSection
