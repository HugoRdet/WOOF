    if(this.state.currentPage === 'host') {
      return (
        <div className='MainPage'>
          <main>
            <HostPage setLogout={this.setLogout} getSignUp={this.getSignUp}/>
          </main>
        </div>
      )
    }
    if(this.state.currentPage === 'signIn') {
      return (
        <div className='MainPage'>
          <main>
            <SignIn getConnected={this.getConnected} getSignUp={this.getSignUp}/>
          </main>
        </div>
      )
    }
    if(this.state.currentPage === 'signUp') {
      return (
        <div className='MainPage'>
          <main>
            <SignUp setLogout={this.setLogout}/>
          </main>
        </div>
      )
    }
    if(this.state.currentPage === 'profile'){
      return (
        <div className="MainPage">
          <BannerTop isConnected={this.state.isConnected} setLogout={this.setLogout}/>
          <main>
            <NavBarLeft/>
            <div>
              <ProfileFeed/>
              <NewMessage parent_id={"-1"}/>
            </div>
          </main>
        </div>
      )
    }