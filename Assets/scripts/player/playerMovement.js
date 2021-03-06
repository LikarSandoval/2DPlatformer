﻿#pragma strict

var thisPlayerRigid : Rigidbody2D;
var thisPlayerTransform : Transform;
var animator : Animator;
var jumpCloudPos : Transform;
var jumpCloudPrefab : GameObject;
private var isGrounded : boolean;
private final var WALK_SPEED : float = 2f;
private final var JUMP_FORCE : float = 4f;
private final var MAX_JUMPS : float = 2f;
private var facing : boolean = true; // true = right; false = left;
private var lastDirection : boolean = true; // true = right; false = left;
private var jumpsLeft : float;
private var lives : int = 2;

function Update () {
	if(jumpsLeft > 0){
		if (Input.GetKeyDown(KeyCode.Space)){
			if (jumpsLeft == 1)
				Instantiate(jumpCloudPrefab, jumpCloudPos.position, Quaternion.identity);
				
			thisPlayerRigid.velocity.y = JUMP_FORCE;
			jumpsLeft --;
		}	
	}
	
	thisPlayerRigid.velocity.x = Input.GetAxis('Horizontal') * WALK_SPEED;
		
	handleAnimations();
	updateDirection();
}

function OnCollisionEnter2D(Collider: Collision2D) {
	if (Collider.collider.gameObject.tag.Equals("ground")){
		isGrounded = true;
		jumpsLeft = MAX_JUMPS;
	}
	
	if (Collider.collider.gameObject.tag.Equals("enemy") && lives > 0){
		animator.SetTrigger('hit');
		lives --;
	}
}

function OnCollisionExit2D(Collider: Collision2D){
	if (Collider.gameObject.tag.Equals("ground"))
		isGrounded = false;
}

function handleAnimations(){
	if((Input.GetAxis('Horizontal') > 0 || Input.GetAxis('Horizontal') < 0))
		animator.SetBool('isMoving', true);
	else
		animator.SetBool('isMoving', false);
		
	if (!isGrounded)
		animator.SetBool('inAir', true);
	else
		animator.SetBool('inAir', false);
}

function updateDirection(){
	if (Input.GetAxis('Horizontal') > 0)
		lastDirection = true;
		
	if (Input.GetAxis('Horizontal') < 0)
		lastDirection = false;
		
	if(lastDirection != facing){
		thisPlayerTransform.localScale.x = thisPlayerTransform.localScale.x * -1;
		facing = !facing;
	}
}

function changeColliderState(bool : int){ // 1 = true 0 = false
	if (bool == 1){
		Physics2D.IgnoreLayerCollision(9, 10, true);
		GetComponent.<Collider2D>().enabled = false;
		GetComponent.<Collider2D>().enabled = true;
	}
	else
		Physics2D.IgnoreLayerCollision(9, 10, false);
}