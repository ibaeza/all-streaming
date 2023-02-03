package com.ibaeza.allstreamingbackend.controller;

import com.ibaeza.allstreamingbackend.exception.AccountNotFoundException;
import com.ibaeza.allstreamingbackend.model.Account;
import com.ibaeza.allstreamingbackend.model.response.availableAccountResponse;
import com.ibaeza.allstreamingbackend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
@CrossOrigin("http://localhost:3000")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/save")
    public String save(@RequestBody Account account ){
        accountService.saveAccount(account);
        return "Account successfully created";
    }

    @GetMapping("/getAll")
    public List<Account> getAll(){
        return accountService.getAllAccounts();
    }

    @GetMapping("/get/{id}")
    public Account getById(@PathVariable int id){
        return accountService.getAccountById(id);
    }

    @GetMapping("/getAvailable/idType/{id_type}")
    public List<availableAccountResponse> getAvailableByTypeId(@PathVariable int id_type){
        return accountService.getAvailableAccountsByTypeId(id_type);
    }

    @GetMapping("/getAvailable/service/{service}")
    public List<availableAccountResponse> getAvailableByService(@PathVariable String service){
        return accountService.getAvailableAccountsByService(service);
    }

    @PutMapping("/edit/{id}")
    public Account editById(@RequestBody Account newAccount, @PathVariable int id){
        return accountService.editAccountById(newAccount, id);
    }

    @PutMapping("/{id}/editStatus/{status}")
    public Account editStatusById(@PathVariable int id, @PathVariable String status){
        return accountService.editAccountStatusById(id, status);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteById(@PathVariable int id){
        if(!accountService.existsAccountById(id)){
            throw new AccountNotFoundException(id);
        }

        accountService.deleteAccountById(id);

        return "Account with id "+id+" has been deleted success.";
    }
}
