package com.ibaeza.allstreamingbackend.repository;

import com.ibaeza.allstreamingbackend.model.Account;
import com.ibaeza.allstreamingbackend.model.query.AccountQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    @Query(AccountQuery.AVAILABLE_ACCOUNTS_BY_TYPEID)
    List<Account> AvailableAccountsByTypeId(int id);
    @Query(AccountQuery.AVAILABLE_ACCOUNTS_BY_SERVICE)
    List<Account> AvailableAccountsByService(String service);

}
