package com.neuralnoir.backend.controller;

import com.neuralnoir.backend.entity.Inquiry;
import com.neuralnoir.backend.repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
@CrossOrigin(origins = "*") // Allows API calls from Next.js on port 3000
public class InquiryController {

    @Autowired
    private InquiryRepository inquiryRepository;

    @PostMapping
    public ResponseEntity<Inquiry> createInquiry(@RequestBody Inquiry inquiry) {
        Inquiry savedInquiry = inquiryRepository.save(inquiry);
        return ResponseEntity.ok(savedInquiry);
    }

    @GetMapping
    public ResponseEntity<List<Inquiry>> getAllInquiries() {
        List<Inquiry> inquiries = inquiryRepository.findAll();
        return ResponseEntity.ok(inquiries);
    }
}
