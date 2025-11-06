"use client";
const AllSubscribers = (props) => {
  // console.log(props.subscribers);
  const subscribers = JSON.parse(props.subscribers);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="wrapper-top">
            <div>
              <h1>Subscribers List</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {subscribers.map((item) => {
          return (
            <div className="col-4" key={item._id}>
              <div className="subscriber-list">
                <div style={{ fontWeight: "bold" }}>{item.name}</div>
                <div>{item.email}</div>
                <div>{item.message}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllSubscribers;
