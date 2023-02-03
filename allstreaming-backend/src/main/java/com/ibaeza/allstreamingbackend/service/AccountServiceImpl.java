package com.ibaeza.allstreamingbackend.service;

import com.ibaeza.allstreamingbackend.model.Account;
import com.ibaeza.allstreamingbackend.model.response.availableAccountResponse;
import com.ibaeza.allstreamingbackend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ibaeza.allstreamingbackend.exception.AccountNotFoundException;

import java.util.*;

@Service
public class AccountServiceImpl implements AccountService{

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Account getAccountById(int id) {
        return accountRepository.findById(id).orElseThrow(()->new AccountNotFoundException(id));
    }

    @Override
    public Account editAccountById(Account newAccount, int id) {
        return accountRepository.findById(id)
                .map(account -> {
                    account.setType(newAccount.getType());
                    account.setStatus(newAccount.getStatus());
                    return accountRepository.saveAndFlush(account);
                }).orElseThrow(()->new AccountNotFoundException(id));
    }

    @Override
    public boolean existsAccountById(int id) {
        return accountRepository.existsById(id);
    }

    @Override
    public void deleteAccountById(int id) {
        accountRepository.deleteById(id);
    }

    @Override
    public List<availableAccountResponse> getAvailableAccountsByTypeId(int id_type) {
        List<availableAccountResponse> response = new ArrayList<>();
        List<Account> accounts = accountRepository.AvailableAccountsByTypeId(id_type);

        for (Account acc : accounts) {
            availableAccountResponse avAcc = new availableAccountResponse();
            avAcc.setId(acc.getId());
            avAcc.setStatus(acc.getStatus());
            response.add(avAcc);
        }

        return response;
    }

    @Override
    public List<availableAccountResponse> getAvailableAccountsByService(String service) {
        List<availableAccountResponse> response = new ArrayList<>();
        List<Account> accounts = accountRepository.AvailableAccountsByService(service);

        for (Account acc : accounts) {
            availableAccountResponse avAcc = new availableAccountResponse();
            avAcc.setId(acc.getId());
            avAcc.setStatus(acc.getStatus());
            response.add(avAcc);
        }

        return response;
    }

    @Override
    public Account editAccountStatusById(int id, String newStatus) {
        return accountRepository.findById(id)
                .map(account -> {
                    account.setStatus(newStatus);
                    return accountRepository.saveAndFlush(account);
                }).orElseThrow(()->new AccountNotFoundException(id));
    }

}
