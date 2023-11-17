import {Component} from '@angular/core';
import {Result} from "../../core/models/result";
import {ScannerService} from "../../core/services/scanner.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  results: Result[] = [];
  isLoading = false;

  constructor(private scanner: ScannerService, private messageService: MessageService, private router: Router) {
  }

  ngOnInit(): void {
     this.getResults();
  }

  getResults() {
    this.isLoading = true;
    this.scanner.getScanResults().subscribe({
      next: (results) => {
        this.results = results;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Unable to retrieve results'});
      }
    });
  }

  onDeleteClick(result: Result) {
    this.isLoading = true;
    this.scanner.deleteScanResult(result._id).subscribe({
      next: () => {
        this.isLoading = false;
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Result deleted'});
        this.getResults();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Unable to delete result'});
      }
    });
  }

  onResultClick(result: Result) {
    this.router.navigate([`/scan-results/${result._id}`], {state: {result}});
  }
}
