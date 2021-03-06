var React = require('react');
var firebaseUtils = require('../utils/firebaseUtils');
var Login = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  

  getInitialState: function(){
    return {
      error: false,
      displaySecond:(this.props.register)?"block":"none"
    }
  },

 
  
  componentDidMount:function() {
    this.props.loadingCallback(false);
  },
   componentWillUnmount:function() {
	  this.props.loadingCallback(true);
  },
  handleSubmit: function(e){
    e.preventDefault();
    var email = this.refs.email.value;
    var pw = this.refs.pw.value;
    firebaseUtils.loginWithPW({email: email, password: pw}, function(err){
      if ( ! err ) {
        var location = this.props.location
        if (location.state && location.state.nextPathname) {
          this.context.router.replace(location.state.nextPathname)
        } else {
          this.context.router.replace('/')
        }
      } else {
        console.log("Login failed! ", err);
        this.setState({error: err});
      }
    }.bind(this));
  },
  render: function(){
    var errors = this.state.error ? <p> {this.state.error} </p> : '';
    return (

<form className="contact" onSubmit={this.handleSubmit}>
	<div className="inner">
		<h1>Let&rsquo;s get started.</h1>
		<p>This will be an amazing experience</p>
		<input className="email" type="text"  ref="email" placeholder="Email" />
		<input className="pass" type="password" ref="pw" placeholder="Password" />

    <input style={{display:this.state.displaySecond}} className="pass2" type="password" ref="pw2" placeholder="Password" />
{errors}
		<input className="submit" type="submit" value="Login" />
	</div>
</form>

    );
  }
});

module.exports =  Login;
