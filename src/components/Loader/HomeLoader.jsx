import Skeleton from "react-loading-skeleton";

const HomeLoader = () => {
  const items = [];
  for (let i = 1; i < 10; i++) {
    items.push(
      <div
        className="card mb-3"
        style={{ marginRight: "10px", width: "400px" }}
        key={i}
      >
        <div className="row">
          <div className="col-md-4">
            <Skeleton
              style={{ marginLeft: "-12px", paddingTop: "5px" }}
              src=""
              height={230}
              width={150}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                <Skeleton />
              </h5>
              <p className="card-text">
                <Skeleton />
              </p>
              <p className="card-text">
                <small className="text-muted">
                  <Skeleton />
                </small>
              </p>
              <p className="card-text">
                <Skeleton />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col mb-3">
          <div className=" float-start" style={{ marginLeft: "-10px" }}>
            <Skeleton width={50} height={35} />
          </div>
          <div className="float-end">
            <Skeleton width={50} height={35} />
          </div>
        </div>
      </div>
      <div className="row row-cols-md-2">{items}</div>
    </>
  );
};

export default HomeLoader;
