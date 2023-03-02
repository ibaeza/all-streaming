package com.ibaeza.allstreamingbackend.service;

import com.ibaeza.allstreamingbackend.model.Account;
import com.ibaeza.allstreamingbackend.model.response.availableAccountResponse;
import reactor.core.publisher.Mono;

import java.util.List;

public interface AccountService {

    public Account saveAccount(Account account);
    public List<Account> getAllAccounts();
    public Account getAccountById(int id);
    public Account editAccountById(Account newAccount, int id);
    public boolean existsAccountById(int id);
    public void deleteAccountById(int id);
    public List<availableAccountResponse> getAvailableAccountsByTypeId(int id_type);
    public List<availableAccountResponse> getAvailableAccountsByService(String service);
    public Account editAccountStatusById(int id, String status);
    public Mono<String> getPostTitle();
}
