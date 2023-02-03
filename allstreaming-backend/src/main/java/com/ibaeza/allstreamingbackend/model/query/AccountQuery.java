package com.ibaeza.allstreamingbackend.model.query;

public class AccountQuery {

    public static final String AVAILABLE_ACCOUNTS_BY_TYPEID = "SELECT a FROM Account a WHERE a.type.id = ?1 AND a.status = 'available'";
    public static final String AVAILABLE_ACCOUNTS_BY_SERVICE = "SELECT a FROM Account a, Type t WHERE a.type.id = t.id AND t.service = ?1 AND  a.status = 'available'";

}
