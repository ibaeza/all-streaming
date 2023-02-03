package com.ibaeza.allstreamingbackend.exception;

public class AccountNotFoundException extends RuntimeException{
    public AccountNotFoundException(int id){
        super("Could not found the account with id "+id);
    }
}
