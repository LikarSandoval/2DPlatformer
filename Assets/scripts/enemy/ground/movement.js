#pragma strict

var thisEnemyRigid : Rigidbody2D;
var thisEnemyTransform : Transform;
var isDead : boolean = false;
private var walkSpeed : float = 0.6f;

function Update () {
	if (!isDead)		
		thisEnemyRigid.velocity.x = walkSpeed;
	else
		thisEnemyRigid.velocity.x = 0;
}

function OnCollisionEnter2D(Collider: Collision2D) {
	if (Collider.gameObject.tag.Equals("bound")){
		thisEnemyTransform.localScale.x = thisEnemyTransform.localScale.x * -1;
		walkSpeed *= -1;
	}
}