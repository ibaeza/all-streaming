package com.ibaeza.allstreamingbackend.controller;

import com.ibaeza.allstreamingbackend.exception.AccountNotFoundException;
import com.ibaeza.allstreamingbackend.model.Account;
import com.ibaeza.allstreamingbackend.model.response.availableAccountResponse;
import com.ibaeza.allstreamingbackend.service.AccountService;
import io.micrometer.core.annotation.Counted;
import io.micrometer.core.annotation.Timed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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
    @Timed(value = "getAll.time", description = "Time taken to get all accounts")
    @Counted(value = "getAll.counter", description = "Number of times getAll is called")
    public List<Account> getAll(){
        long startTime = System.currentTimeMillis();
        List<Account> accounts = accountService.getAllAccounts();
        long endTime = System.currentTimeMillis();
        System.out.println("Time taken to get all accounts: {} ms" + (endTime - startTime));
        return accounts;
    }

    @GetMapping("/get/{id}")
    @Timed(value = "getById.time", description = "Time taken to get account by id")
    @Counted(value = "getById.counter", description = "Number of times getById is called")
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

    @GetMapping(value = "/string", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @Timed(value = "getString.time", description = "Time taken to get string through Web Client")
    @Counted(value = "getString.counted", description = "Number of times getString is called using Web Client")
    public Mono<String> getString() {
        return accountService.getPostTitle();
    }
}
