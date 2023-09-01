import "./rightBar.scss";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/13035386/pexels-photo-13035386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <span>Patrick</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/17823425/pexels-photo-17823425/free-photo-of-mer-nature-nager-sous-marin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <span>Sitraka</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/17859453/pexels-photo-17859453/free-photo-of-lumineux-homme-gens-femme.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <p>
                <span>Ria'aina</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/17127836/pexels-photo-17127836/free-photo-of-mode-femme-clairiere-sombre.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <p>
                <span>Kareem</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/17887967/pexels-photo-17887967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <div className="online" />
              <span>Allan</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/10034617/pexels-photo-10034617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <div className="online" />
              <span>John Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/17314384/pexels-photo-17314384/free-photo-of-main-jambes-jouer-musique.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
