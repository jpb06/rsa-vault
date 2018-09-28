# rsa-store

A little library meant to store and provide rsa keys.

## Purpose

Built to serve as a repository to be used by some services ran on a local server. Main intent is to use JSON Web Token (JWT) without having to rely on an external provider like auth0. 

## Environment / Dependencies

- Targeted for node.js, using Typescript superset for coding.
- Persitence relying on mongodb.
- DAL built on top mongoose & Typegoose.
- node-rsa for crypto.

## Version history

*  0.0.1 : Crypto service to serve/generate keypairs.

## todo

Proper tests...